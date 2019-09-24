import React from 'react'
import { useStreamQuery, StreamQuery } from '../generated/graphql'
import { Loading } from './Loading'
import { Columns } from './Columns'
import { Column } from './Column'
import { Image } from './Image'
import classnames from 'classnames'

interface Props {
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>
  setMedia: React.Dispatch<React.SetStateAction<string[]>>
  media: string[]
  setValue: (field: string, value: any) => void
}

export const AddMediaModal: React.FC<Props> = ({
  toggleModal,
  media,
  setMedia,
  setValue,
}): JSX.Element => {
  const { data, error, loading, fetchMore } = useStreamQuery()

  const isSelected = (id: string) => {
    if (media.some((e) => e === id)) {
      return true
    }
    return false
  }

  const cancel = (): void => {
    setMedia([])
    setValue('media', []), toggleModal(false)
  }

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Vælg billeder</p>
        <button
          className="delete"
          type="button"
          aria-label="close"
          onClick={cancel}
        ></button>
      </header>
      <section className="modal-card-body">
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        {loading && <Loading />}
        {data && data.getStream && (
          <>
            <Columns isMobile isMultiline>
              {data.getStream.edges.map((file) => (
                <Column
                  mobileWidth={'half'}
                  tabletWidth={'half'}
                  desktopWidth={'one-third'}
                  fullHDWidth={'one-third'}
                  key={file.publicId}
                >
                  <div
                    className={classnames(
                      'box',
                      isSelected(file.id) && 'is-selected'
                    )}
                    onClick={(): void => {
                      if (isSelected(file.id)) {
                        setMedia((media) => media.filter((e) => e !== file.id))
                      } else {
                        setMedia((media) => [...new Set([file.id, ...media])])
                      }
                    }}
                  >
                    <Image square {...file} />
                  </div>
                </Column>
              ))}
            </Columns>
            {data.getStream.pageInfo.hasNextPage && (
              <nav className="level is-mobile">
                <div className="level-item has-text-centered">
                  <button
                    className="button"
                    type="button"
                    onClick={(): void => {
                      fetchMore({
                        variables: {
                          cursor: data.getStream.pageInfo.endCursor,
                        },
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
                    }}
                  >
                    Indlæs flere billeder
                  </button>
                </div>
              </nav>
            )}
          </>
        )}
      </section>
      <footer className="modal-card-foot">
        <button
          className="button is-link"
          type="button"
          onClick={(): void => {
            setValue('media', media)
            toggleModal(false)
          }}
        >
          Vælg
        </button>
        <button className="button" type="button" onClick={cancel}>
          Annuller
        </button>
      </footer>
    </div>
  )
}
