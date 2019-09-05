import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useRect } from '../hooks/useRect'

const containerRef = React.createRef<HTMLDivElement>()

export const NotFound: React.FC<RouteComponentProps> = (props): JSX.Element => {
  const containerRect = useRect(containerRef)

  return (
    <section className="section">
      <div className="container" ref={containerRef}>
        <pre>{JSON.stringify(containerRect, null, 2)}</pre>
      </div>
    </section>
  )
}
