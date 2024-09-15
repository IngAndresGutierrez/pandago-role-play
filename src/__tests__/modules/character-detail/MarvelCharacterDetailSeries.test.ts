import 'vuetify/styles'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { describe, expect, test } from 'vitest'

import MarvelCharacterDetailSeries from '@/modules/character-detail/components/MarvelCharacterDetailSeries.vue'

const vuetify = createVuetify()

const mockCharacter = {
  id: 1,
  name: 'Test character',
  thumbnail: {
    path: 'https://mypath.com/images',
    extension: 'jpg',
  },
}

describe('MarvelCharacterDetailSeries.vue', () => {
  test('renders correctly', () => {
    const wrapper = mount(MarvelCharacterDetailSeries, {
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
