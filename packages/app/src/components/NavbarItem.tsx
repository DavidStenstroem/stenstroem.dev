import * as React from 'react'
import { IconDefinition, FontAwesomeIcon } from '../icons'
import { Match, Link } from '@reach/router'
import classnames from 'classnames'

interface Props {
  path: string
  text?: string
  to: string
  icon?: IconDefinition
  button?: boolean
}

export const NavbarItem: React.FunctionComponent<Props> = ({
  to,
  text,
  path,
  icon,
  children,
  button,
}): JSX.Element => (
  <Match path={path}>
    {(props): JSX.Element => (
      <Link
        to={to}
        className={classnames(
          'navbar-item',
          button && 'button',
          props.match && 'is-active'
        )}
      >
        {icon && (
          <span className="icon">
            <FontAwesomeIcon icon={icon} />
          </span>
        )}
        {text && <span>{text}</span>}
      </Link>
    )}
  </Match>
)
