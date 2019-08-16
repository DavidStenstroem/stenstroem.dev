import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Section } from '../components/Section'

export const Account: React.FunctionComponent<
  RouteComponentProps
> = (): JSX.Element => (
  <Section>
    <p className="is-4">Account</p>
  </Section>
)
