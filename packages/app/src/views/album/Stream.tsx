import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { useStreamQuery, StreamQuery } from '../../generated/graphql'
import { useRect } from '../../hooks/useRect'
import { Loading } from '../../components/Loading'
import { Section } from '../../components/Section'
import { ImageLayout } from '../../components/ImageLayout'
import { Image } from '../../components/Image'

const containerRef = React.createRef<HTMLDivElement>()

export const Stream: React.FC<RouteComponentProps> = (props): JSX.Element => {
  const { data, error, loading, fetchMore } = useStreamQuery()
  const { width } = useRect(containerRef)

  return (
    <>
      <section className="section">
        <div className="container has-text-centered" ref={containerRef}>
          {loading && <Loading />}
          {error && (
            <div className="content">
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
          )}
          {data && data.getStream && (
            <h1 className="title">
              {data.getStream.pageInfo.totalItems} billeder og videoer
            </h1>
          )}
        </div>
      </section>
      {data && data.getStream && (
        <Section>
          <ImageLayout width={width}>
            {data.getStream.edges.map((media) => (
              <Image key={media.publicId} {...media} />
            ))}
          </ImageLayout>
          {data.getStream.pageInfo.hasNextPage && (
            <nav className="level is-mobile">
              <div className="level-item has-text-centered">
                <button
                  className="button"
                  type="button"
                  onClick={() =>
                    fetchMore({
                      variables: { cursor: data.getStream.pageInfo.endCursor },
                      updateQuery: (
                        previousResult,
                        { fetchMoreResult }
                      ): StreamQuery => {
                        if (!fetchMoreResult) return previousResult
                        return {
                          ...previousResult,
                          getStream: {
                            ...previousResult.getStream,
                            ...fetchMoreResult.getStream,
                            edges: [
                              ...previousResult.getStream.edges,
                              ...fetchMoreResult.getStream.edges,
                            ],
                            pageInfo: fetchMoreResult.getStream.pageInfo,
                          },
                        }
                      },
                    })
                  }
                >
                  Indlæs flere billeder
                </button>
              </div>
            </nav>
          )}
        </Section>
      )}
    </>
  )
}
