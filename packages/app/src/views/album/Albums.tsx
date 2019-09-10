import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Section } from '../../components/Section'

export const Albums: React.FC<RouteComponentProps> = (props): JSX.Element => {
  return (
    <Section>
      <div className="content">
        <p>Albums</p>
      </div>
    </Section>
  )
}
