import { Thumbnail } from '../models/images'

export const getImageFromThumbnail = (thumbnail: Thumbnail) => {
  return `${thumbnail.path}.${thumbnail.extension}`
}
