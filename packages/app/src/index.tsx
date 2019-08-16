import * as React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/react-components'
import { client } from './apollo/client'
import { App } from './App'

const root = document.getElementById('root')
if (root) {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    root
  )
}
