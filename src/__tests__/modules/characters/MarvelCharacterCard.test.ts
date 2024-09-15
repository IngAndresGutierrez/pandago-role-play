import 'vuetify/styles'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { describe, expect, test } from 'vitest'

import MarvelCharacterCard from '@/modules/characters/components/MarvelCharacterCard.vue'

const vuetify = createVuetify()

const mockCharacter = {
  id: 1,
  name: 'Test character',
  thumbnail: {
    path: 'https://mypath.com/images',
    extension: 'jpg',
  },
}

describe('MarvelCharacterCard.vue', () => {
  test('renders correctly', () => {
    const wrapper = mount(MarvelCharacterCard, {
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
