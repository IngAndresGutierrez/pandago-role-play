import { Thumbnail } from '@/modules/common/models/images'

export interface Comic {
    id: number
    title: string
    description: string
    thumbnail: Thumbnail
    prices: {
        price: string | number
    }[]
}
