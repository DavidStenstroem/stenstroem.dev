import * as React from 'react'
import classnames from 'classnames'

interface Props {
  show: boolean
  children: React.ReactChild[] | React.ReactChild
  handleClose?: () => void
  hasCloseButton?: boolean
}

export const Modal: React.FC<Props> = ({
  show,
  children,
  handleClose,
  hasCloseButton,
}): JSX.Element => {
  return (
    <div className={classnames('modal', show && 'is-active')}>
      <div className="modal-background" onClick={handleClose}></div>
      {children}
      {hasCloseButton && (
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={handleClose}
        ></button>
      )}
    </div>
  )
}
