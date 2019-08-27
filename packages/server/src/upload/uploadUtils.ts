import * as multer from 'multer'
import { Request } from 'express'
import { v4 } from 'uuid'
import { join, extname } from 'path'
import fetch from 'node-fetch'
import FormData from 'form-data'
import { createHash } from 'crypto'
import { config } from '../config'
import { createReadStream } from 'fs'
import * as exiftoolVendored from 'exiftool-vendored'

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

export const upload = async (file: Express.Multer.File): Promise<any> => {
  const stream = createReadStream(file.path)
  const formData = new FormData()
  formData.append('file', stream)
  formData.append('upload_preset', config.cloudinary.uploadPreset)

  const response = await fetch(createUploadUrl(file.path), {
    method: 'POST',
    body: formData,
  })
  return await response.json()
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
  if (!file.originalname.match(/\.(jpe?g|heic|m4v|mp4)$/i)) {
    cb(new Error('Filformatet understøttes ikke'), false)
  }
  cb(null, true)
}

export const uploadMiddleware = multer.default({ storage, fileFilter }).any()
