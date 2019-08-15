import Cookies from 'universal-cookie'

export class Account {
  id: string
  name: string
  email: string

  constructor(userInput: { id: string; name: string; email: string }) {
    this.id = userInput.id
    this.name = userInput.name
    this.email = userInput.email
  }

  static accountFromCookie(): Account {
    const cookies = new Cookies()
    cookies.get('access-token')
    // TODO
  }
}
