import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { SendInvite } from '../components/SendInvite'
import { MyInvites } from '../components/MyInvites'

export const Invite: React.FunctionComponent<RouteComponentProps> = (
  props
): JSX.Element => (
  <>
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Inviter nye brugere</h1>
          <p>Her kan du invitere nye brugere til appen. </p>
        </div>
      </div>
    </section>
    <SendInvite />
    <MyInvites />
  </>
)
