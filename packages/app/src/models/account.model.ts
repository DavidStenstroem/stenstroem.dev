import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'

interface TokenDto {
  name: string
  id: string
  email: string
  iat: number
  exp: number
}

export class Account {
  id: string
  name: string
  email: string
  slug?: string

  constructor(userInput: {
    id: string
    name: string
    email: string
    slug?: string
  }) {
    this.id = userInput.id
    this.name = userInput.name
    this.email = userInput.email
    this.slug = userInput.slug
  }

  static accountFromCookie(): Account {
    const cookies = new Cookies()
    const token = cookies.get('access-token') as string
    try {
      const decoded = jwtDecode<TokenDto>(token)
      return new Account({ ...decoded })
    } catch (err) {
      console.warn(err)
      return undefined
    }
  }
}
