import { config as dotenvConfig, DotenvConfigOptions } from 'dotenv'

const options: DotenvConfigOptions =
  (process.env.NODE_ENV as string) === 'production'
    ? { path: `${process.env.HOME as string}/.env.stenstroem-dev-server` }
    : {}

dotenvConfig(options)

console.log('=================== PROCESS.ENV ===================')
console.log(process.env)
console.log('=================== /PROCESS.ENV ===================')
console.log(dotenvConfig(options).error)

interface Config {
  dbName: string
  dbConnectionString: string
  accessTokenSecret: string
  refreshTokenSecret: string
  cloudinary: CloudinaryConfig
  engineApiKey: string
  emailConfig: EmailConfig
}

interface EmailConfig {
  host: string
  port: number
  user: string
  pass: string
}

interface CloudinaryConfig {
  apiKey: string
  apiSecret: string
  baseEndpoint: string
  uploadPreset: string
  cloudName: string
}

export const config: Config = {
  engineApiKey: process.env.ENGINE_API_KEY as string,
  dbConnectionString: process.env.MONGODB_URI as string,
  dbName: process.env.DB_NAME as string,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
  cloudinary: {
    apiKey: process.env.CLOUDINARY_API_KEY as string,
    apiSecret: process.env.CLOUDINARY_API_SECRET as string,
    baseEndpoint: 'https://api.cloudinary.com/v1_1',
    uploadPreset: 'stenstroem-dev-upload-preset',
    cloudName: 'stnstrm',
  },
  emailConfig: {
    host: process.env.MAIL_HOST as string,
    port: Number(process.env.MAIL_PORT as string),
    user: process.env.MAIL_USER as string,
    pass: process.env.MAIL_PASS as string,
  },
}
