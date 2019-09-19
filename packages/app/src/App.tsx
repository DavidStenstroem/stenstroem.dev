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
import { CreateAlbum } from './pages/CreateAlbum'
import { ToastContainer } from 'react-toastify'
import { AlbumRouter } from './views/album'
import { NotFound } from './pages/NotFound'
import { client } from './apollo/client'
import { GetAccountQuery, GetAccountDocument } from './generated/graphql'
import { CookieConsent } from './components/CookieConsent'

export const App: React.FunctionComponent = (): JSX.Element => {
  const [account, setAccount] = React.useState<Account>(undefined)
  React.useEffect(() => {
    const fetchAccount = async (): Promise<void> => {
      try {
        const response = await client.query<GetAccountQuery, {}>({
          query: GetAccountDocument,
          fetchPolicy: 'no-cache',
        })
        if (response && response.data && response.data.me) {
          setAccount({ ...response.data.me })
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchAccount()
  }, [])

  return (
    <div className="app">
      <MainContext.Provider value={{ account, setAccount }}>
        <ToastContainer />
        <CookieConsent />
        <Nav />
        <MainContext.Consumer>
          {({ account }): JSX.Element => {
            if (account) {
              return (
                <Router id="main" primary={false}>
                  <Dashboard path="/" />
                  <AccountPage path="/account" />
                  <Invite path="/invite" />
                  <AlbumRouter path="album/*" />
                  <NotFound default />
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
