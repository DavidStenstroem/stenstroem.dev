import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon, faCookieBite } from '../icons'

interface Props {
  expires?: number
  debug?: boolean
}

export const CookieConsent: React.FC<Props> = ({ expires = 365, debug }) => {
  const [visible, setVisible] = useState<boolean>(false)

  useEffect((): void => {
    if (!localStorage.getItem('accept-cookies')) {
      setVisible(true)
    } else {
      const expiration = localStorage.getItem('accept-cookies')
      if (Number(expiration) < Date.now()) {
        localStorage.removeItem('accept-cookies')
        setVisible(true)
      } else {
        setVisible(false)
      }
    }
  }, [])

  const accept = (): void => {
    const oneYear = 365 * 24 * 60 * 60 * 1000

    const expires = new Date(Date.now() + oneYear)
    localStorage.setItem('accept-cookies', expires.getTime().toString())
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="notification is-primary cookie-consent">
      <div className="content">
        <FontAwesomeIcon icon={faCookieBite} size="3x" />
        <p>
          Denne side bruger cookies. Ved at bruge denne side accepterer du
          samtidig brugen af cookies.
        </p>
        <button className="button" type="button" onClick={accept}>
          Accepter
        </button>
      </div>
    </div>
  )
}
