import * as multer from 'multer'
import { Request } from 'express'
import { v4 } from 'uuid'
import { join, extname } from 'path'
import fetch from 'node-fetch'
import FormData from 'form-data'
import { config } from '../config'
import { createReadStream } from 'fs'
import * as exiftoolVendored from 'exiftool-vendored'
import { User } from '../models/user.model'
import { InstanceType } from 'typegoose'
import { ResourceType, MediaModel } from '../models/media.model'
import { OriginalCreateDate } from '../models/original-create-date.model'
import { Face } from '../models/face.model'

const videoExtensions: string[] = [
  'avi',
  'flv',
  'm4v',
  'mkv',
  'mov',
  'mp4',
  'mpeg',
  'mpg',
  'nsv',
  'ogg',
  'webm',
  'wmv',
]

const imageExtensions = [
  'heif',
  'heic',
  'bmp',
  'gif',
  'jpeg',
  'jpg',
  'vnd',
  'png',
  'webp',
]

export const isVideo = (path: string): boolean => {
  const exts = Object.create(null)
  videoExtensions.forEach((el) => (exts[el] = true))
  return (
    extname(path)
      .slice(1)
      .toLowerCase() in exts
  )
}

export const isImage = (path: string): boolean => {
  const extensions = new Set(imageExtensions)
  return extensions.has(
    extname(path)
      .slice(1)
      .toLowerCase()
  )
}

export const createUploadUrl = (filePath: string): string | null => {
  if (isImage(filePath)) {
    return `${config.cloudinary.baseEndpoint}/${config.cloudinary.cloudName}/image/upload`
  } else if (isVideo(filePath)) {
    return `${config.cloudinary.baseEndpoint}/${config.cloudinary.cloudName}/video/upload`
  }
  return null
}

const exiftool = exiftoolVendored.exiftool

export interface CloudinaryData {
  public_id: string
  version: string | number
  signature: string
  width: number
  height: number
  format: string
  resource_type: 'image' | 'video'
  created_at: string
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  access_mode: string
  original_filename: string
  pages?: number | string
  is_audio?: boolean
  frame_rate?: number
  bit_rate?: number
  duration?: number | string
  nb_frames?: string | number
  faces?: Array<Array<number>>
  coordinates?: {
    faces?: Array<Array<number>>
  }
  audio?: CloudinaryAudio
  video?: CloudinaryVideo
}

export interface CloudinaryAudio {
  codec?: string
  bit_rate?: number
  frequency?: number
  channels?: number
  channel_layout?: string
}

export interface CloudinaryVideo {
  pix_format?: string
  codec?: string
  level?: number
  profile?: string
  bit_rate?: number
  dar?: string
}

export interface UploadResponse {
  data: CloudinaryData
  tags?: exiftoolVendored.Tags
  user: InstanceType<User>
}

export const upload = async (
  file: Express.Multer.File,
  user: InstanceType<User>
): Promise<UploadResponse> => {
  const tags = await exiftool.read(file.path)
  const stream = createReadStream(file.path)
  const formData = new FormData()
  formData.append('file', stream)
  formData.append('upload_preset', config.cloudinary.uploadPreset)

  const response = await fetch(createUploadUrl(file.path), {
    method: 'POST',
    body: formData,
  })

  return {
    data: (await response.json()) as CloudinaryData,
    tags,
    user,
  }
}

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ): void => {
    cb(null, join(__dirname, 'files'))
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ): void => {
    cb(null, `${v4()}-${file.originalname.replace(/\s+/g, '-')}`.toLowerCase())
  },
})

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void
): void => {
  const allowedExtensions = videoExtensions.concat(imageExtensions)
  if (
    !allowedExtensions.includes(
      extname(file.originalname)
        .substr(1)
        .toLowerCase()
    )
  ) {
    cb(new Error('Filformatet understøttes ikke'), false)
  }
  cb(null, true)
}

export const uploadMiddleware = multer.default({ storage, fileFilter }).any()
