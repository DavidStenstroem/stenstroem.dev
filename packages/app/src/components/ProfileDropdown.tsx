import * as React from 'react'
import { MainContextState, MainContext } from '../context/MainContext'
import {
  FontAwesomeIcon,
  faAngleDown,
  faUser,
  faSignOut,
  faPaperPlane,
} from '../icons'
import { navigate } from '@reach/router'
import { Avatar } from './Avatar'

export const ProfileDropdown: React.FunctionComponent = (): JSX.Element => {
  const { account } = React.useContext<MainContextState>(MainContext)
  return (
    <div>
      <div className="profile dropdown is-right is-hoverable">
        <div className="user button profile-button">
          <figure className="image is-32x32">
            <Avatar email={account.email} round size={64} />
          </figure>
          <span className="name">{account.name}</span>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
        <div
          className="profile-dropdown-content dropdown-menu"
          id="profile-dropdown"
        >
          <div id="dropdown" className="dropdown-content">
            {/* account */}
            <div
              className="dropdown-item profile-item"
              onClick={(): void => navigate('/account')}
            >
              <span className="profile-icon">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span>Min konto</span>
            </div>

            {/* Invite new user */}
            <div
              className="dropdown-item profile-item"
              onClick={(): void => navigate('/invite')}
            >
              <span className="profile-icon">
                <FontAwesomeIcon icon={faPaperPlane} />
              </span>
              <span>Invitér</span>
            </div>

            <hr className="dropdown-divider" />

            {/* Log out */}
            <div className="dropdown-item profile-item">
              <span className="profile-icon">
                <FontAwesomeIcon icon={faSignOut} />
              </span>
              <span>Log ud</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
