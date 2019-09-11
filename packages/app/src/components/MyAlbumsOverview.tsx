import * as React from 'react'
import { useMyAlbumsQuery } from '../generated/graphql'
import { Section } from './Section'
import { Loading } from './Loading'
import { Columns } from './Columns'
import { Column } from './Column'
import { Image } from './Image'
import { Link } from '@reach/router'
import { FontAwesomeIcon, faLockAlt, faImages } from '../icons'

export const MyAlbumsOverview: React.FC = (): JSX.Element => {
  const { loading, error, data } = useMyAlbumsQuery({ variables: { limit: 4 } })

  return (
    <>
      <Section>
        {loading && <Loading />}
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        {data && data.myAlbums && (
          <>
            <div className="content">
              <h4 className="title is-4">Mine album</h4>
            </div>
            <Columns isMobile isMultiline>
              {data.myAlbums.edges.map(
                ({ cover, isPrivate, mediaCount, slug, title }) => (
                  <Column
                    mobileWidth={6}
                    tabletWidth={6}
                    desktopWidth={3}
                    fullHDWidth={3}
                    key={slug}
                  >
                    <div className="card">
                      <div className="card-image">
                        <Image
                          square
                          height={cover.height}
                          width={cover.width}
                          publicId={cover.publicId}
                          resourceType={cover.resourceType}
                        />
                      </div>
                      <div className="card-content">
                        <div className="content">
                          <p className="title is-4">
                            <Link to={`/album/${slug}`}>{title}</Link>
                          </p>
                        </div>
                        <nav className="level is-mobile">
                          <div className="level-left">
                            {isPrivate && (
                              <div
                                className="level-item tooltip"
                                data-tooltip="Dette album er privat"
                              >
                                <span className="icon">
                                  <FontAwesomeIcon icon={faLockAlt} />
                                </span>
                              </div>
                            )}
                            <div
                              className="level-item tooltip"
                              data-tooltip={`Dette album indeholder ${mediaCount} ${
                                mediaCount === 1 ? 'billede' : 'billeder'
                              }.`}
                            >
                              <span className="icon">
                                <FontAwesomeIcon icon={faImages} />
                                <span style={{ paddingLeft: '5px' }}>
                                  {mediaCount}
                                </span>
                              </span>
                            </div>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </Column>
                )
              )}
            </Columns>

            <nav className="level is-mobile">
              <div className="level-left"></div>
              <div className="level-right">
                <div className="level-item">
                  <Link to={`/album`}>
                    <p>Se alle</p>
                  </Link>
                </div>
              </div>
            </nav>

            <hr />
          </>
        )}
      </Section>
    </>
  )
}
