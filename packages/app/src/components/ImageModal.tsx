import React, { useState } from 'react'
import { ResourceType } from '../generated/graphql'
import { FontAwesomeIcon, faChevronLeft, faChevronRight } from '../icons'

interface Props {
  source: {
    height: number
    publicId: string
    resourceType: ResourceType
    width: number
  }
}

export const ImageModal: React.FC<Props> = ({ source }): JSX.Element => {
  return (
    <>
      <span className="icon image-modal-prev" onClick={(): void => {}}>
        <FontAwesomeIcon color="white" size="3x" icon={faChevronLeft} />
      </span>
      <div className="modal-content">
        <p
          className="image"
          style={
            source.resourceType === ResourceType.Video
              ? {
                  width: `${source.width / 2}px`,
                  height: `${source.height / 2}px`,
                  margin: '0 auto',
                  pointerEvents: 'none',
                }
              : {}
          }
        >
          {source.resourceType === ResourceType.Image ? (
            <img
              src={`https://res.cloudinary.com/stnstrm/${source.resourceType.toLowerCase()}/upload/${
                source.publicId
              }.jpg`}
            />
          ) : (
            <video
              poster={`https://res.cloudinary.com/stnstrm/video/upload/${source.publicId}.jpg`}
              width={source.width / 2}
              height={source.height / 2}
              controls
            >
              <source
                src={`https://res.cloudinary.com/stnstrm/video/upload/${source.publicId}.webm`}
                type="video/webm"
              />
              <source
                src={`https://res.cloudinary.com/stnstrm/video/upload/${source.publicId}.mp4`}
                type="video/mp4"
              />
            </video>
          )}
        </p>
      </div>
      <span className="icon image-modal-next" onClick={(): void => {}}>
        <FontAwesomeIcon color="white" size="3x" icon={faChevronRight} />
      </span>
    </>
  )
}
