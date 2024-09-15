interface Creator {
    name: string
    role: string
}

export interface Story {
    title?: string
    description?: string
    creators?: {
        items: Creator[]
    }
}
