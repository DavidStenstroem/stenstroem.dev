import * as React from 'react'
import { RouteComponentProps, Link } from '@reach/router'
import { MyAlbumsOverview } from '../components/MyAlbumsOverview'
import { SharedAlbumsOverview } from '../components/SharedAlbumsOverview'

export const Dashboard: React.FunctionComponent<RouteComponentProps> = (
  props
): JSX.Element => {
  return (
    <>
      <MyAlbumsOverview />
      <SharedAlbumsOverview />
    </>
  )
}
