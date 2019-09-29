import React, { useState } from 'react'
import { RouteComponentProps, Link } from '@reach/router'
import {
  useGetAlbumQuery,
  ResourceType,
  GetAlbumQuery,
} from '../../generated/graphql'
import { Section } from '../../components/Section'
import { Image } from '../../components/Image'
import { ImageLayout } from '../../components/ImageLayout'
import { useRect } from '../../hooks/useRect'
import { Loading } from '../../components/Loading'
import parse from 'html-react-parser'
import { Modal } from '../../components/Modal'
import { ImageModal } from '../../components/ImageModal'
import { ApolloQueryResult } from 'apollo-client'

const containerRef = React.createRef<HTMLDivElement>()

interface Props extends RouteComponentProps {
  slug?: string
}

export const Album: React.FC<Props> = ({ slug }): JSX.Element => {
  const { data, error, loading, fetchMore } = useGetAlbumQuery({
    variables: { slug: slug || '' },
  })
  const { width } = useRect(containerRef)
  const [showImageModal, toggleImageModal] = useState<boolean>(false)
  const [source, setSource] = useState<{
    height: number
    publicId: string
    resourceType: ResourceType
    width: number
  }>()
  const [imgIndex, setIndex] = useState<number>(0)

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
          {data && data.getAlbum && (
            <>
              <h1 className="title">{data.getAlbum.title}</h1>
              <p className="subtitle">
                Oprettet af{' '}
                <Link to={`/user/${data.getAlbum.createdBy.slug}`}>
                  {data.getAlbum.createdBy.name}
                </Link>
              </p>
            </>
          )}
        </div>
      </section>
      {data && data.getAlbum && (
        <>
          <Modal
            hasCloseButton
            hide={toggleImageModal}
            isShowing={showImageModal}
          >
            <ImageModal source={source} />
          </Modal>
          {data.getAlbum.description && (
            <Section>
              <div className="content">{parse(data.getAlbum.description)}</div>
            </Section>
          )}
          <Section>
            <ImageLayout width={width}>
              {data.getAlbum.media.edges.map(
                ({ height, publicId, resourceType, width }, index) => (
                  <div
                    onClick={(): void => {
                      setIndex(index)
                      setSource({ height, publicId, resourceType, width })
                      toggleImageModal(true)
                    }}
                    style={{ cursor: 'pointer' }}
                    key={publicId}
                  >
                    <Image
                      height={height}
                      publicId={publicId}
                      resourceType={resourceType}
                      width={width}
                    />
                  </div>
                )
              )}
            </ImageLayout>
            {data.getAlbum.media.pageInfo.hasNextPage && (
              <nav className="level is-mobile">
                <div className="level-item has-text-centered">
                  <button
                    className="button"
                    type="button"
                    onClick={(): Promise<ApolloQueryResult<GetAlbumQuery>> =>
                      fetchMore({
                        variables: {
                          cursor: data.getAlbum.media.pageInfo.endCursor,
                        },
                        updateQuery: (
                          previousResult,
                          { fetchMoreResult }
                        ): GetAlbumQuery => {
                          if (!fetchMoreResult) {
                            return previousResult
                          }
                          return {
                            ...previousResult,
                            getAlbum: {
                              ...previousResult.getAlbum,
                              ...fetchMoreResult.getAlbum,
                              media: {
                                edges: [
                                  ...previousResult.getAlbum.media.edges,
                                  ...fetchMoreResult.getAlbum.media.edges,
                                ],
                                pageInfo:
                                  fetchMoreResult.getAlbum.media.pageInfo,
                              },
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
        </>
      )}
    </>
  )

  // if (loading) return <p>Loading ...</p>
  // if (error)
  //   return (
  //     <Section>
  //       <pre>{JSON.stringify(error, null, 2)}</pre>
  //     </Section>
  //   )

  // const { title, media, createdBy, description } = data.getAlbum

  // return (
  //   <>
  //     <section className="hero">
  //       <div className="hero-body">
  //         <div className="container has-text-centered">
  //           <h1 className="title">{title}</h1>
  //         </div>
  //       </div>
  //     </section>
  //     {description && (
  //       <Section>
  //         <div className="content">{description}</div>
  //       </Section>
  //     )}
  //     <section className="section">
  //       <div className="container" ref={containerRef}>
  //         <div className="content">
  //           <pre>{JSON.stringify(containerRect, null, 2)}</pre>
  //         </div>
  //         <ImageLayout>
  //           {media.map((item) => (
  //             <Image key={item.publicId} {...item} />
  //           ))}
  //         </ImageLayout>
  //       </div>
  //     </section>
  //   </>
  // )
}
