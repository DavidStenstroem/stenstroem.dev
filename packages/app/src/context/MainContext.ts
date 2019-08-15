import * as React from 'react'
import { Account } from '../models/account.model'

export interface MainContextState {
  account?: Account
  setAccount?: React.Dispatch<React.SetStateAction<Account>>
}

export const MainContext = React.createContext<MainContextState>(null)
