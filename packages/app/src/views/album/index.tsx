import * as React from 'react'
import { RouteComponentProps, Router } from '@reach/router'
import { Create } from './Create'
import { Albums } from './Albums'
import { Album } from './Album'
import { SharedAlbums } from './SharedAlbums'

export const AlbumRouter: React.FC<RouteComponentProps> = (
  props
): JSX.Element => (
  <Router primary={false}>
    <Create path="create" />
    <Albums path="/" default />
    <Album path=":slug" />
    <SharedAlbums path="shared" />
  </Router>
)
