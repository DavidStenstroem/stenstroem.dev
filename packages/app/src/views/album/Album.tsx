import * as React from 'react'
import { RouteComponentProps, Link } from '@reach/router'
import { useGetAlbumQuery } from '../../generated/graphql'
import { Section } from '../../components/Section'
import { Image } from '../../components/Image'
import { ImageLayout } from '../../components/ImageLayout'
import { useRect } from '../../hooks/useRect'
import { Loading } from '../../components/Loading'
import parse from 'html-react-parser'

const containerRef = React.createRef<HTMLDivElement>()

interface Props extends RouteComponentProps {
  slug?: string
}

export const Album: React.FC<Props> = ({ slug }): JSX.Element => {
  const { data, error, loading } = useGetAlbumQuery({
    variables: { slug: slug || '' },
  })
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
          {data.getAlbum.description && (
            <Section>
              <div className="content">{parse(data.getAlbum.description)}</div>
            </Section>
          )}
          <Section>
            <ImageLayout width={width}>
              {data.getAlbum.media.map(
                ({ height, publicId, resourceType, width }) => (
                  <Image
                    height={height}
                    key={publicId}
                    publicId={publicId}
                    resourceType={resourceType}
                    width={width}
                  />
                )
              )}
            </ImageLayout>
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
