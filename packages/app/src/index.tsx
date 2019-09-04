import * as React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/react-components'
import { client } from './apollo/client'
import { App } from './App'
import * as Sentry from '@sentry/browser'

const loadPolyfills = () => {
  const polyfills = []

  if (!supportsResizeObserver()) {
    polyfills.push(import('resize-observer-polyfill'))
  }

  return Promise.all(polyfills)
}

const supportsResizeObserver = (): boolean =>
  'ResizeObserver' in window &&
  'ResizeObserverEntry' in
    window /*&&
  'contentRect' in ResizeObserverEntry.prototype*/

Sentry.init({
  dsn: 'https://d040229282924b478dda2d1f52dda181@sentry.io/1546746',
})

loadPolyfills().then(() => {
  const root = document.getElementById('root')
  if (root) {
    render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
      root
    )
  }
})
