import 'vuetify/styles'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { describe, expect, test } from 'vitest'

import MarvelCharacterDetailEvents from '@/modules/character-detail/components/MarvelCharacterDetailEvents.vue'

const vuetify = createVuetify()

const mockCharacter = {
  id: 1,
  name: 'Test character',
  thumbnail: {
    path: 'https://mypath.com/images',
    extension: 'jpg',
  },
}

describe('MarvelCharacterDetailEvents.vue', () => {
  test('renders correctly', () => {
    const wrapper = mount(MarvelCharacterDetailEvents, {
      global: {
        plugins: [vuetify],
      },
      props: {
        character: mockCharacter,
      },
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
