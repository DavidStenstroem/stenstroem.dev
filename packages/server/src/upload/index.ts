import { Router } from 'express'
import { uploadMiddleware, upload } from './uploadUtils'
import { RequestWithUser } from '../types/RequestWithUser'
import { UserModel } from '../models/user.model'
import { MediaModel, ResourceType } from '../models/media.model'
import { OriginalCreateDate } from '../models/original-create-date.model'
import { Face } from '../models/face.model'

export const uploadApi = Router()

uploadApi.post('/', uploadMiddleware, (req, res, next): void => {
  UserModel.findById((req as RequestWithUser).userId)
    .then((user) => {
      return Promise.all(
        (req.files as Express.Multer.File[]).map((file) => upload(file, user))
      )
    })
    .then((results) => {
      const allMedia = results.map(({ data, tags, user }) => {
        const media = new MediaModel({
          publicId: data.public_id,
          version: data.version,
          signature: data.signature,
          width: data.width,
          height: data.height,
          format: data.format,
          resourceType:
            data.resource_type === 'image'
              ? ResourceType.image
              : ResourceType.video,
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
    })
    .then((docs) => {
      res.json(docs.map(({ _id }) => _id as string))
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json(err)
    })
})
