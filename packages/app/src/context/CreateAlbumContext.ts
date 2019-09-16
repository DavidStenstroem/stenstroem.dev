import * as React from 'react'
import { Account } from '../models/account.model'

export interface CreateAlbumContextValues {
  users?: Account[]
  setUsers?: React.Dispatch<React.SetStateAction<Account[]>>
}

export const CreateAlbumContext = React.createContext<CreateAlbumContextValues>(
  null
)
