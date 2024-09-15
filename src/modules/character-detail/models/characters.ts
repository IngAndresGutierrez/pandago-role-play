import { Thumbnail } from '@/modules/common/models/images'

export interface Character {
    id: number;
    name: string;
    description: string;
    thumbnail: Thumbnail;
}
