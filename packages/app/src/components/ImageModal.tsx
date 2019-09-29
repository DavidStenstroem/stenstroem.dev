import React, { useState } from 'react'
import { ResourceType } from '../generated/graphql'
import { FontAwesomeIcon, faChevronLeft, faChevronRight } from '../icons'

interface Props {
  images: {
    height: number
    publicId: string
    resourceType: ResourceType
    width: number
  }[]
  index: number
}

export const ImageModal: React.FC<Props> = ({ images, index }): JSX.Element => {
  const [idx, setIdx] = useState<number>(index)

  return (
    <>
      <span
        className="icon image-modal-prev"
        onClick={(): void =>
          setIdx((idx) => {
            if (idx > 0) {
              return idx - 1
            } else {
              return images.length - 1
            }
          })
        }
      >
        <FontAwesomeIcon color="white" size="3x" icon={faChevronLeft} />
      </span>
      <div className="modal-content">
        <p
          className="image"
          style={
            images[idx].resourceType === ResourceType.Video
              ? {
                  width: `${images[idx].width / 2}px`,
                  height: `${images[idx].height / 2}px`,
                  margin: '0 auto',
                  pointerEvents: 'none',
                }
              : {}
          }
        >
          {images[idx].resourceType === ResourceType.Image ? (
            <img
              src={`https://res.cloudinary.com/stnstrm/${images[
                idx
              ].resourceType.toLowerCase()}/upload/${images[idx].publicId}.jpg`}
            />
          ) : (
            <video
              poster={`https://res.cloudinary.com/stnstrm/video/upload/${images[idx].publicId}.jpg`}
              width={images[idx].width / 2}
              height={images[idx].height / 2}
              controls
            >
              <source
                src={`https://res.cloudinary.com/stnstrm/video/upload/${images[idx].publicId}.webm`}
                type="video/webm"
              />
              <source
                src={`https://res.cloudinary.com/stnstrm/video/upload/${images[idx].publicId}.mp4`}
                type="video/mp4"
              />
            </video>
          )}
        </p>
      </div>
      <span
        className="icon image-modal-next"
        onClick={(): void =>
          setIdx((idx) => {
            console.log(idx < images.length - 1)
            if (idx < images.length - 1) {
              return idx + 1
            } else {
              return 0
            }
          })
        }
      >
        <FontAwesomeIcon color="white" size="3x" icon={faChevronRight} />
      </span>
    </>
  )
}
