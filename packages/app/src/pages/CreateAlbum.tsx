import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { MainContextState, MainContext } from '../context/MainContext'
import { Section } from '../components/Section'

export const CreateAlbum: React.FunctionComponent<RouteComponentProps> = (
  props
): JSX.Element => {
  const { account } = React.useContext<MainContextState>(MainContext)

  return <Section>Create</Section>
}
