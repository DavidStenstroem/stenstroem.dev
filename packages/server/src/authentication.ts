import { RequestWithUser } from 'src/types/RequestWithUser'
import { InstanceType } from 'typegoose'
import { User, UserModel } from 'src/models/user.model'
import { AuthenticationError } from 'apollo-server-errors'

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
