import { RequestWithUser } from './types/RequestWithUser'
import { InstanceType } from 'typegoose'
import { User, UserModel } from './models/user.model'
import { AuthenticationError } from 'apollo-server-errors'
import { sign, verify } from 'jsonwebtoken'
import { config } from './config'
import { NextFunction, Response } from 'express'

const { accessTokenSecret, refreshTokenSecret } = config

export const authenticate = async (
  req: RequestWithUser
): Promise<InstanceType<User>> => {
  if (!req.userId) {
    throw new AuthenticationError('Ikke logget ind')
  }

  const user = await UserModel.findById(req.userId)
  if (!user) {
    throw new AuthenticationError('Ikke logget ind')
  }

  return user
}

interface TokenData {
  id: string
  iat: number
  exp: number
}

interface RefreshTokenData extends TokenData {
  count: number
}

interface AccessTokenData extends TokenData {
  name: string
  email: string
}

interface UserInput {
  id: string
  name: string
  email: string
  count: number
}

export const tokens = (user: UserInput): string[] => {
  const { id, name, email, count } = user
  const accessToken = sign({ id, name, email }, accessTokenSecret, {
    expiresIn: '2h',
  })
  const refreshToken = sign({ id, count }, refreshTokenSecret, {
    expiresIn: '30d',
  })
  return [accessToken, refreshToken]
}

export const refreshTokens = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.cookies['access-token'] && !req.cookies['refresh-token']) {
    return next()
  }

  const accessTokenCookie = req.cookies['access-token'] as string
  const refreshTokenCookie = req.cookies['refresh-token'] as string

  try {
    const data = verify(accessTokenCookie, accessTokenSecret) as AccessTokenData
    req.userId = data.id
    return next()
  } catch {}

  if (!refreshTokenCookie) {
    return next()
  }

  let data
  try {
    data = verify(refreshTokenCookie, refreshTokenSecret) as RefreshTokenData
  } catch {
    return next()
  }

  const user = await UserModel.findById(data.id)
  if (!user || user.count !== data.count) {
    return next()
  }

  const [accessToken, refreshToken] = tokens({
    count: user.count,
    id: user.id,
    email: user.email,
    name: user.name,
  })

  res.cookie('refresh-token', refreshToken, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
  res.cookie('access-token', accessToken, {
    maxAge: 2 * 60 * 60 * 1000,
    expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
  })
  req.userId = user.id

  return next()
}
