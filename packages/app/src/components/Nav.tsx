import * as React from 'react'
import { Link } from '@reach/router'
import { Logo } from './Logo'
import { MainContext } from '../context/MainContext'
import classnames from 'classnames'

export const Nav: React.FunctionComponent = (): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false)
  return (
    <MainContext.Consumer>
      {({ account }): JSX.Element => (
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Logo />
            {account && (
              <a
                aria-label="menu"
                aria-expanded="false"
                className="navbar-burger burger"
                role="button"
                onClick={() => setOpen(!open)}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            )}
          </div>

          {account && (
            <div className={classnames('navbar-menu', open && 'is-active')}>
              <div className="navbar-start"></div>
            </div>
          )}
        </nav>
      )}
    </MainContext.Consumer>
  )
}
