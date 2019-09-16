import {} from '../types/graphql'
import { FileUpload } from 'graphql-upload'
import { ReadStream, unlinkSync, createWriteStream, createReadStream } from 'fs'
import { v4 } from 'uuid'
import { join } from 'path'
import readChunk from 'read-chunk'
import fileType from 'file-type'
import { CloudinaryData, UploadResponse } from '../types/Cloudinary'
import FormData from 'form-data'
import fetch from 'node-fetch'
import { config } from '../config'
import { exiftool } from 'exiftool-vendored'
import { MediaModel, ResourceType, Media } from '../models/media.model'
import { InstanceType } from 'typegoose'
import { User } from '../models/user.model'
import { OriginalCreateDate } from '../models/original-create-date.model'
import { Face } from '../models/face.model'

type ResType = 'image' | 'video'

export const insertFiles = async (
  fileInfo: UploadResponse[],
  albumId: string,
  user: InstanceType<User>
): Promise<InstanceType<Media>[]> => {
  const allMedia = fileInfo.map(({ data, tags }) => {
    const media = new MediaModel({
      albumId: [albumId],
      publicId: data.public_id,
      version: data.version,
      signature: data.signature,
      width: data.width,
      height: data.height,
      format: data.format,
      resourceType:
        data.resource_type === 'image'
          ? ResourceType.Image
          : ResourceType.Video,
      bytes: data.bytes,
      type: data.type,
      etag: data.etag,
      placeholder: data.placeholder,
      url: data.url,
      secureUrl: data.secure_url,
      accessMode: data.access_mode,
      originalFilename: data.original_filename,
      uploadedBy: user,
      loc: {
        type: 'Point',
        coordinates: [
          tags.GPSLongitude ? tags.GPSLongitude : 0,
          tags.GPSLatitude ? tags.GPSLatitude : 0,
        ],
      },
    })

    if (tags.DateTimeOriginal) {
      const dto = tags.DateTimeOriginal
      const ocd = new OriginalCreateDate()
      ocd.day = dto.day
      ocd.hour = dto.hour
      ocd.millisecond = dto.millisecond
      ocd.minute = dto.minute
      ocd.month = dto.month
      ocd.rawValue = dto.rawValue
      ocd.second = dto.second
      ocd.tzoffsetMinutes = dto.tzoffsetMinutes
      ocd.year = dto.year
      media.originalCreateDate = ocd
    }

    if (data.faces) {
      for (const faceCoords of data.faces) {
        const face = new Face()
        face.coordinates = faceCoords
        media.faces.push(face)
      }
    }

    if (data.pages) media.pages = data.pages
    if (data.is_audio) media.isAudio = data.is_audio
    if (data.frame_rate) media.frameRate = data.frame_rate
    if (data.bit_rate) media.bitRate = data.bit_rate
    if (data.duration) media.duration = data.duration
    if (data.nb_frames) media.nbFrames = data.nb_frames

    return media
  })
  return MediaModel.insertMany(allMedia)
}

export const cloudinaryUpload = async (
  filePath: string,
  resType: ResType
): Promise<CloudinaryData> => {
  const stream = createReadStream(filePath)
  const formData = new FormData()
  formData.append('file', stream)
  formData.append('upload_preset', config.cloudinary.uploadPreset)

  const response = await fetch(
    `${config.cloudinary.baseEndpoint}/${config.cloudinary.cloudName}/${resType}/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )

  return (await response.json()) as CloudinaryData
}

export const storeFS = (
  stream: ReadStream,
  filename: string
): Promise<string> => {
  const id = v4()
  const path = join(
    __dirname,
    `../tmp/${id}_${filename.replace(/\s+/g, '-').toLowerCase()}`
  )
  return new Promise((resolve, reject) =>
    stream
      .on('error', (error) => {
        unlinkSync(path)
        reject(error)
      })
      .pipe(createWriteStream(path))
      .on('error', (error) => reject(error))
      .on('finish', () => resolve(path))
  )
}

export const allowedImageExtensions: string[] = [
  'jpg',
  'png',
  'jpeg',
  'webp',
  'bmp',
  'heic',
]

export const allowedVideoExtensions: string[] = [
  'mp4',
  'webm',
  'mov',
  'avi',
  'mpg',
  'mpeg',
  'm4v',
]

export const allowedImageMimetypes: string[] = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/bmp',
  'image/heif',
  'image/heif-sequence',
  'image/heic',
  'image/heic-sequence',
]

export const allowedVideoMimetypes: string[] = [
  'video/mp4',
  'video/x-matroska',
  'video/webm',
  'video/quicktime',
  'video/mpeg',
  'video/x-m4v',
]

export const fileFilter = (filePath: string): ResType => {
  const buffer = readChunk.sync(filePath, 0, fileType.minimumBytes)
  const { mime, ext } = fileType(buffer)

  if (
    allowedImageExtensions.includes(ext) ||
    allowedImageMimetypes.includes(mime)
  ) {
    return 'image'
  }

  if (
    allowedVideoExtensions.includes(ext) ||
    allowedVideoMimetypes.includes(mime)
  ) {
    return 'video'
  }

  unlinkSync(filePath)
  throw new Error('Unsupported file detected!')
}

export const processUpload = async (
  upload: FileUpload
): Promise<UploadResponse> => {
  const { createReadStream, filename } = await upload
  const stream = createReadStream()
  const path = await storeFS(stream, filename)
  const resType = fileFilter(path)

  const data = await cloudinaryUpload(path, resType)
  const tags = await exiftool.read(path)

  unlinkSync(path)

  return {
    data,
    tags,
  }
}
