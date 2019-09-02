import * as React from 'react'
import {
  CreateAlbumContextValues,
  CreateAlbumContext,
} from '../context/CreateAlbumContext'
import { useGetAccountsQuery } from '../generated/graphql'
import { Columns } from './Columns'
import { Column } from './Column'
import { Avatar } from './Avatar'
import { FontAwesomeIcon, faSquare, faCheckSquare } from '../icons'
import { Account } from '../models/account.model'

interface Props {
  handleClose: () => void
}

export const SelectUsersModal: React.FC<Props> = ({
  handleClose,
}): JSX.Element => {
  const { users, setUsers } = React.useContext<CreateAlbumContextValues>(
    CreateAlbumContext
  )
  const { data, error, loading } = useGetAccountsQuery({
    variables: { withMe: false },
  })

  const accountClicked = (account: Account): void => {
    if (isSelected(account.id)) {
      setUsers(users.filter((e) => e.id !== account.id))
    } else {
      setUsers([...users, account])
    }
  }

  const isSelected = (id: string): boolean => {
    if (users.some((e) => e.id === id)) {
      return true
    }
    return false
  }

  const cancel = (): void => {
    setUsers([])
    handleClose()
  }

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Vælg hvem der har adgang</p>
        <button onClick={cancel} className="delete" aria-label="close"></button>
      </header>
      <section className="modal-card-body">
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        {loading && <p>Loading ...</p>}
        {data && data.allAccounts && (
          <Columns isMobile isMultiline>
            {data.allAccounts.map(
              ({ id, name, email }): JSX.Element => (
                <Column
                  mobileWidth={'full'}
                  tabletWidth={'full'}
                  desktopWidth={'half'}
                  key={id}
                >
                  <div
                    className="box"
                    onClick={(): void =>
                      accountClicked(new Account({ id, name, email }))
                    }
                  >
                    <article className="media">
                      <figure className="media-left">
                        <p className="image is-64x64">
                          <Avatar round email={email} name={name} size={128} />
                        </p>
                      </figure>
                      <div className="media-content">
                        <div className="content">
                          <p>
                            <strong>{name}</strong>
                          </p>
                          <p>{email}</p>
                        </div>
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
        <button className="button is-link" onClick={handleClose}>
          Vælg
        </button>
        <button className="button" onClick={cancel}>
          Annuller
        </button>
      </footer>
    </div>
  )
}
