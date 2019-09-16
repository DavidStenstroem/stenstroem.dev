import * as React from 'react'

interface Props {
  email: string
  size?: number
  name?: string
  round?: boolean
}

export const Avatar: React.FC<Props> = ({
  email,
  size,
  round,
}): JSX.Element => {
  const url = `https://res.cloudinary.com/stnstrm/image/upload/w_${size},h_${size},c_scale/cool_cat_bcuvub.jpg`
  return <img className={round ? 'is-rounded' : ''} src={url} alt={name} />
}
