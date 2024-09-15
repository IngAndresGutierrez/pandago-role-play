import { describe, expect, test } from 'vitest'

import { Thumbnail } from '@/modules/common/models/images'
import { getImageFromThumbnail } from '@/modules/common/utils/images'

describe('images', () => {
  test('getImageFromThumbnail', () => {
    const dummyThumbnail:Thumbnail = { path: 'https://test-image.com/image', extension: 'jpg' }
    const imageUrl = 'https://test-image.com/image.jpg'

    expect(getImageFromThumbnail(dummyThumbnail)).toBe(imageUrl)
  })
})
