import * as React from 'react'
import classnames from 'classnames'

interface ColumnsProps {
  isCentered?: boolean
  isMobile?: boolean
  isVCentered?: boolean
  isMultiline?: boolean
  children?: React.ReactChild[] | React.ReactChild
}

export const Columns: React.FunctionComponent<ColumnsProps> = ({
  isCentered,
  isMobile,
  children,
  isVCentered,
  isMultiline,
}: ColumnsProps): JSX.Element => (
  <div
    className={classnames(
      'columns',
      isCentered ? 'is-centered' : null,
      isMobile ? 'is-mobile' : null,
      isVCentered ? 'is-vcentered' : null,
      isMultiline ? 'is-multiline' : null
    )}
  >
    {children}
  </div>
)
