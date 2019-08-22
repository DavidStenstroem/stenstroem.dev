import * as React from 'react'
import { Account } from './models/account.model'
import { Router } from '@reach/router'
import { MainContext } from './context/MainContext'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { Dashboard } from './pages/Dashboard'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Invite } from './pages/Invite'
import { Account as AccountPage } from './pages/Account'
import './styles/master.scss'

export const App: React.FunctionComponent = (): JSX.Element => {
  const [account, setAccount] = React.useState<Account>(
    Account.accountFromCookie()
  )
  return (
    <div className="app">
      <MainContext.Provider value={{ account, setAccount }}>
        <Nav />
        <MainContext.Consumer>
          {({ account }): JSX.Element => {
            if (account) {
              return (
                <Router id="main" primary={false}>
                  <Dashboard path="/" />
                  <AccountPage path="/account" />
                  <Invite path="/invite" />
                </Router>
              )
            }
            return (
              <Router id="main" primary={false}>
                <Login path="/login" default />
                <Register path="/register/:id" />
              </Router>
            )
          }}
        </MainContext.Consumer>
        <Footer />
      </MainContext.Provider>
    </div>
  )
}
