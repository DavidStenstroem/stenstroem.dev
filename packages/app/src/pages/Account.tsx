import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Section } from '../components/Section'
import { ChangeName } from '../components/ChangeName'

export const Account: React.FunctionComponent<
  RouteComponentProps
> = (): JSX.Element => (
  <>
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{}</h1>
          <h2 className="subtitle">{}</h2>
        </div>
      </div>
    </section>
    <ChangeName />
  </>
)
