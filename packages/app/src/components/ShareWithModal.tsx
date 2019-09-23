import React from 'react'
import { useGetAccountsQuery } from '../generated/graphql'
import { Loading } from './Loading'
import { Columns } from './Columns'
import { Column } from './Column'
import { Avatar } from './Avatar'
import { FontAwesomeIcon, faCheckSquare, faSquare } from '../icons'

interface Props {
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>
  setUsers: React.Dispatch<React.SetStateAction<string[]>>
  selected: string[]
  setValue: (field: string, value: any) => void
}

export const ShareWithModal: React.FC<Props> = ({
  toggleModal,
  setUsers,
  selected,
  setValue,
}): JSX.Element => {
  const { data, error, loading } = useGetAccountsQuery({
    variables: { withMe: false },
  })

  const isSelected = (id: string): boolean => {
    if (selected.some((e) => e === id)) {
      return true
    }
    return false
  }

  const cancel = (): void => {
    setUsers([])
    setValue('sharedWith', [])
    toggleModal(false)
  }

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Vælg, hvem der har adgang</p>
        <button
          className="delete"
          type="button"
          aria-label="close"
          onClick={() => cancel()}
        ></button>
      </header>
      <section className="modal-card-body">
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        {loading && <Loading />}
        {data && data.allAccounts && (
          <Columns isMobile isMultiline>
            {data.allAccounts.map(
              ({ id, name, email }): JSX.Element => (
                <Column
                  mobileWidth={'full'}
                  tabletWidth={'full'}
                  desktopWidth={'full'}
                  fullHDWidth={'full'}
                  key={id}
                >
                  <div
                    className="box"
                    onClick={(): void => {
                      if (isSelected(id)) {
                        setUsers((users) => users.filter((e) => e !== id))
                      } else {
                        setUsers((users) => [...new Set([id, ...users])])
                      }
                    }}
                  >
                    <article className="media">
                      <figure className="media-left">
                        <p className="image is-64x64">
                          <Avatar round email={email} name={name} size={128} />
                        </p>
                      </figure>
                      <div className="media-content">
                        <p>
                          <strong>{name}</strong>
                        </p>
                        <p>{email}</p>
                      </div>
                      <div className="media-right">
                        <FontAwesomeIcon
                          icon={isSelected(id) ? faCheckSquare : faSquare}
                        />
                      </div>
                    </article>
                  </div>
                </Column>
              )
            )}
          </Columns>
        )}
      </section>
      <footer className="modal-card-foot">
        <button
          className="button is-link"
          type="button"
          onClick={(): void => {
            // setUsers(accounts.map(({ id }) => id))
            toggleModal(false)
            setValue('sharedWith', selected)
          }}
        >
          Vælg
        </button>
        <button className="button" type="button" onClick={(): void => cancel()}>
          Annuller
        </button>
      </footer>
    </div>
  )
}
