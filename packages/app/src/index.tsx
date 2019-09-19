import * as React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/react-components'
import { client } from './apollo/client'
import { App } from './App'
import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: 'https://d040229282924b478dda2d1f52dda181@sentry.io/1546746',
})

const root = document.getElementById('root')
if (root) {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    root
  )
}
