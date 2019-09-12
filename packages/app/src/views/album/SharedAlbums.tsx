import * as React from 'react'
import { RouteComponentProps, Link } from '@reach/router'
import { Section } from '../../components/Section'
import { useSharedAlbumsQuery } from '../../generated/graphql'
import { Loading } from '../../components/Loading'
import { Columns } from '../../components/Columns'
import { Column } from '../../components/Column'
import { Image } from '../../components/Image'
import { FontAwesomeIcon, faImages, faLockAlt } from '../../icons'

export const SharedAlbums: React.FC<RouteComponentProps> = (
  props
): JSX.Element => {
  const { loading, error, data, fetchMore } = useSharedAlbumsQuery()

  return (
    <>
      <Section>
        {loading && <Loading />}
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        {data && data.sharedAlbums && (
          <>
            <div className="content">
              <h4 className="title is-4">Mine album</h4>
            </div>

            <Columns isMobile isMultiline>
              {data.sharedAlbums.edges.map(
                ({ cover, isPrivate, mediaCount, slug, title }) => (
                  <Column
                    mobileWidth={6}
                    tabletWidth={4}
                    desktopWidth={3}
                    fullHDWidth={3}
                    key={slug}
                  >
                    <div className="card">
                      <div className="card-image">
                        <Image square {...cover} />
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
            {data.sharedAlbums.pageInfo.hasNextPage && (
              <nav className="level is-mobile">
                <div className="level-item has-text-centered">
                  <button
                    className="button"
                    type="button"
                    onClick={() => {
                      fetchMore({
                        variables: {
                          cursor: data.sharedAlbums.pageInfo.endCursor,
                        },
                        updateQuery: (previousResult, { fetchMoreResult }) => {
                          console.log(fetchMoreResult)
                          if (!fetchMoreResult) {
                            return previousResult
                          }

                          const newEdges = fetchMoreResult.sharedAlbums.edges
                          const pageInfo = fetchMoreResult.sharedAlbums.pageInfo
                          return {
                            sharedAlbums: {
                              __typename:
                                previousResult.sharedAlbums.__typename,
                              edges: [
                                ...previousResult.sharedAlbums.edges,
                                ...newEdges,
                              ],
                              pageInfo,
                            },
                          }
                        },
                      })
                    }}
                  >
                    Hent flere album
                  </button>
                </div>
              </nav>
            )}
          </>
        )}
      </Section>
    </>
  )
}
