import * as multer from 'multer'
import { Request } from 'express'
import { v4 } from 'uuid'
import { join, extname } from 'path'
import fetch from 'node-fetch'
import FormData from 'form-data'
import { createHash } from 'crypto'
import { config } from '../config'

export const isVideo = (path: string): boolean => {
  const videoExtensions: string[] = [
    '3g2',
    '3gp',
    'aaf',
    'asf',
    'avchd',
    'avi',
    'drc',
    'flv',
    'm2v',
    'm4p',
    'm4v',
    'mkv',
    'mng',
    'mov',
    'mp2',
    'mp4',
    'mpe',
    'mpeg',
    'mpg',
    'mpv',
    'mxf',
    'nsv',
    'ogg',
    'ogv',
    'qt',
    'rm',
    'rmvb',
    'roq',
    'svi',
    'vob',
    'webm',
    'wmv',
    'yuv',
  ]
  const exts = Object.create(null)
  videoExtensions.forEach((el) => (exts[el] = true))
  return (
    extname(path)
      .slice(1)
      .toLowerCase() in exts
  )
}

export const isImage = (path: string): boolean => {
  const imageExtensions = [
    'heif',
    'heic',
    'ase',
    'art',
    'bmp',
    'blp',
    'cd5',
    'cit',
    'cpt',
    'cr2',
    'cut',
    'dds',
    'dib',
    'djvu',
    'egt',
    'exif',
    'gif',
    'gpl',
    'grf',
    'icns',
    'ico',
    'iff',
    'jng',
    'jpeg',
    'jpg',
    'jfif',
    'jp2',
    'jps',
    'lbm',
    'max',
    'miff',
    'mng',
    'msp',
    'nitf',
    'ota',
    'pbm',
    'pc1',
    'pc2',
    'pc3',
    'pcf',
    'pcx',
    'pdn',
    'pgm',
    'PI1',
    'PI2',
    'PI3',
    'pict',
    'pct',
    'pnm',
    'pns',
    'ppm',
    'psb',
    'psd',
    'pdd',
    'psp',
    'px',
    'pxm',
    'pxr',
    'qfx',
    'raw',
    'rle',
    'sct',
    'sgi',
    'rgb',
    'int',
    'bw',
    'tga',
    'tiff',
    'tif',
    'vtf',
    'xbm',
    'xcf',
    'xpm',
    '3dv',
    'amf',
    'ai',
    'awg',
    'cgm',
    'cdr',
    'cmx',
    'dxf',
    'e2d',
    'egt',
    'eps',
    'fs',
    'gbr',
    'odg',
    'svg',
    'stl',
    'vrml',
    'x3d',
    'sxd',
    'v2d',
    'vnd',
    'wmf',
    'emf',
    'art',
    'xar',
    'png',
    'webp',
    'jxr',
    'hdp',
    'wdp',
    'cur',
    'ecw',
    'iff',
    'lbm',
    'liff',
    'nrrd',
    'pam',
    'pcx',
    'pgf',
    'sgi',
    'rgb',
    'rgba',
    'bw',
    'int',
    'inta',
    'sid',
    'ras',
    'sun',
    'tga',
  ]
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

export const upload = async (file: Express.Multer.File): Promise<any> => {
  const timestamp = Date.now()
  const signature = createHash('sha1')
    .update(`timestamp=${timestamp}${'API_SECRET'}`)
    .digest('hex')
  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_key', '')
  formData.append('signature', signature)
  formData.append('timestamp', timestamp)

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
    cb(null, `${v4()}-${file.originalname.replace(/\s+/g, '-')}`)
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
