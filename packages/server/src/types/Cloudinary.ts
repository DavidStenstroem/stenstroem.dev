import { Tags } from 'exiftool-vendored'

export interface CloudinaryData {
  public_id: string
  version: string | number
  signature: string
  width: number
  height: number
  format: string
  resource_type: 'image' | 'video'
  created_at: string
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  access_mode: string
  original_filename: string
  pages?: number | string
  is_audio?: boolean
  frame_rate?: number
  bit_rate?: number
  duration?: number | string
  nb_frames?: string | number
  faces?: Array<Array<number>>
  coordinates?: {
    faces?: Array<Array<number>>
  }
  audio?: CloudinaryAudio
  video?: CloudinaryVideo
}

export interface CloudinaryAudio {
  codec?: string
  bit_rate?: number
  frequency?: number
  channels?: number
  channel_layout?: string
}

export interface CloudinaryVideo {
  pix_format?: string
  codec?: string
  level?: number
  profile?: string
  bit_rate?: number
  dar?: string
}

export interface UploadResponse {
  data: CloudinaryData
  tags?: Tags
}
