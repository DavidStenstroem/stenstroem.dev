import * as React from 'react'

export const Footer: React.FunctionComponent = (): JSX.Element => (
  <footer className="footer">
    <div className="content has-text-centered">
      <p>David Stenstroem - {new Date().getFullYear()}</p>
    </div>
  </footer>
)
