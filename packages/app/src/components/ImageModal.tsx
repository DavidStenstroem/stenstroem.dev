import React, { useState } from 'react'
import { ResourceType } from '../generated/graphql'

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
    <div className="modal-content">
      <p className="image">
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
  )
}
