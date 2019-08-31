import { IconDefinition } from '../icons'

export interface NavButton {
  path: string
  text?: string
  to: string
  icon?: IconDefinition
  button?: boolean
}

export const navbarStart: NavButton[] = [
  {
    path: '/album/create',
    text: 'Nyt album',
    to: '/album/create',
  },
]
