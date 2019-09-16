import * as React from 'react'
import { Section } from './Section'
import { useStreamQuery } from '../generated/graphql'
import { Loading } from './Loading'
import { Columns } from './Columns'
import { Column } from './Column'
import { Image } from './Image'
import { Link } from '@reach/router'

export const StreamOverview: React.FC = (): JSX.Element => {
  const { loading, error, data } = useStreamQuery({ variables: { limit: 4 } })

  return (
    <>
      <Section>
        {loading && <Loading />}
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        {data && data.getStream && (
          <>
            <div className="content">
              <h4 className="title is-4">Mine billeder og videoer</h4>
              <p>{data.getStream.pageInfo.totalItems}</p>
            </div>
            <Columns is-mobile isMultiline>
              {data.getStream.edges.map((media) => (
                <Column
                  mobileWidth={6}
                  tabletWidth={6}
                  desktopWidth={3}
                  fullHDWidth={3}
                  key={media.publicId}
                >
                  <div className="card">
                    <div className="card-image">
                      <Image square {...media} />
                    </div>
                  </div>
                </Column>
              ))}
            </Columns>

            <nav className="level is-mobile">
              <div className="level-left"></div>
              <div className="level-right">
                <div className="level-item">
                  <Link to="/album/stream">
                    <p>Se alle</p>
                  </Link>
                </div>
              </div>
            </nav>
          </>
        )}
      </Section>
    </>
  )
}
