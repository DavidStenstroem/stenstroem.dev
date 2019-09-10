import * as React from 'react'
import { ResourceType } from '../generated/graphql'
import LazyLoad from 'react-lazyload'
import { Loading } from './Loading'

interface Props {
  width: number
  height: number
  square?: boolean
  publicId: string
  resourceType: ResourceType
}

const allowedAspectRatios: string[] = [
  '1by1',
  '5by4',
  '4by3',
  '3by2',
  '5by3',
  '16by9',
  '2by1',
  '3by1',
  '4by5',
  '3by4',
  '2by3',
  '3by5',
  '9by16',
  '1by2',
  '1by3',
]

export const Image: React.FC<Props> = ({
  height,
  square,
  width,
  publicId,
  resourceType,
}): JSX.Element => {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)
  const aspectRatio = (width: number, height: number): string => {
    const divisor = gcd(width, height)
    return `${width / divisor}by${height / divisor}`
  }

  const makeSources = (
    publicId: string,
    resourceType: ResourceType
  ): string[] => {
    const sizes: { w: string; size: string }[] = [
      {
        size: '200',
        w: '300w',
      },
      {
        size: '400',
        w: '768w',
      },
      {
        size: '600',
        w: '1280w',
      },
    ]

    let srcset = ''
    const src = `https://res.cloudinary.com/stnstrm/${resourceType.toLowerCase()}/upload/w_200/${publicId}.jpg`
    sizes.forEach(({ size, w }, index): void => {
      srcset += `https://res.cloudinary.com/stnstrm/${resourceType.toLowerCase()}/upload/w_${size}/${publicId}.jpg ${w} ${
        index === sizes.length - 1 ? '' : ', '
      }`
    })

    return [src, srcset]
  }

  const className = (
    height: number,
    width: number,
    square?: boolean
  ): string => {
    if (square) return 'is-square'
    const ar = aspectRatio(width, height)
    if (allowedAspectRatios.includes(ar)) {
      return `is-${ar}`
    }
    return 'is-square'
  }

  const [src, srcset] = makeSources(publicId, resourceType)

  return (
    <LazyLoad height={200}>
      <figure className={`image ${className(height, width, square)}`}>
        <img
          src={src}
          srcSet={srcset}
          style={square ? { objectFit: 'cover', objectPosition: 'center' } : {}}
        />
      </figure>
    </LazyLoad>
  )
}
