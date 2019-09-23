import * as React from 'react'
import classnames from 'classnames'
import { createPortal } from 'react-dom'

interface Props {
  isShowing: boolean
  children: React.ReactChild[] | React.ReactChild
  hide?: React.Dispatch<React.SetStateAction<boolean>>
  hasCloseButton?: boolean
}

export const Modal: React.FC<Props> = ({
  isShowing,
  children,
  hide,
  hasCloseButton,
}): JSX.Element =>
  isShowing
    ? createPortal(
        <div className="modal is-active">
          <div className="modal-background" onClick={() => hide(false)}></div>
          {children}
          {hasCloseButton && (
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={() => hide(false)}
            ></button>
          )}
        </div>,
        document.body
      )
    : null

// {
//   return (
//     <div className={classnames('modal', show && 'is-active')}>
//       <div className="modal-background" onClick={handleClose}></div>
//       {children}
//       {hasCloseButton && (
//         <button
//           className="modal-close is-large"
//           aria-label="close"
//           onClick={handleClose}
//         ></button>
//       )}
//     </div>
//   )
// }
