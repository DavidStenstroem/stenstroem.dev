import * as React from 'react'
import { RouteComponentProps, Router } from '@reach/router'
import { Create } from './Create'
import { Albums } from './Albums'

export const AlbumRouter: React.FC<RouteComponentProps> = (
  props
): JSX.Element => (
  <Router primary={false}>
    <Create path="create" />
    <Albums path="/" />
  </Router>
)
