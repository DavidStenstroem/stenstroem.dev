import * as React from 'react'
import {
  CreateAlbumContextValues,
  CreateAlbumContext,
} from '../context/CreateAlbumContext'

interface Props {}

export const SelectUsersModal: React.FC<Props> = ({}): JSX.Element => {
  return (
    <CreateAlbumContext.Consumer>
      {({ users, setUsers }): JSX.Element => (
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Vælg hvem der har adgang</p>
            <button className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body"></section>
          <footer className="modal-card-foot">
            <button className="button is-link">Vælg</button>
            <button className="button">Annuller</button>
          </footer>
        </div>
      )}
    </CreateAlbumContext.Consumer>
  )
}
