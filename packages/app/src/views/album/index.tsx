import * as React from 'react'
import { RouteComponentProps, Router } from '@reach/router'
import { Create } from './Create'
import { Albums } from './Albums'
import { Album } from './Album'
import { SharedAlbums } from './SharedAlbums'
import { Stream } from './Stream'

export const AlbumRouter: React.FC<RouteComponentProps> = (
  props
): JSX.Element => (
  <Router primary={false}>
    <Create path="create" />
    <Albums path="/" default />
    <Album path=":slug" />
    <SharedAlbums path="shared" />
    <Stream path="stream" />
  </Router>
)
