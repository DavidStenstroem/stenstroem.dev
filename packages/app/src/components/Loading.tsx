import * as React from 'react'
import { FontAwesomeIcon, faSpinnerThird } from '../icons'
import { SizeProp } from '@fortawesome/fontawesome-svg-core'

interface Props {
  size?: SizeProp
}

export const Loading: React.FC<Props> = ({ size = '3x' }): JSX.Element => (
  <FontAwesomeIcon icon={faSpinnerThird} spin size={size} />
)
