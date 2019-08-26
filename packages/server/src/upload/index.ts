import { Router } from 'express'
import { uploadMiddleware, upload } from './uploadUtils'

export const uploadApi = Router()

uploadApi.post('/', uploadMiddleware, (req, res, next): void => {
  Promise.all((req.files as Express.Multer.File[]).map((file) => upload(file)))
    .then((results) => res.json(results))
    .catch((err) => res.status(400).json(err))
})
