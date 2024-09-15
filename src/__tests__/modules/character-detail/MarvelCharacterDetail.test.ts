import 'vuetify/styles'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { describe, expect, test } from 'vitest'

import MarvelCharacterDetail from '@/modules/character-detail/components/MarvelCharacterDetail.vue'

const vuetify = createVuetify()

const mockCharacter = {
  id: 1,
  name: 'Test character',
  thumbnail: {
    path: 'https://mypath.com/images',
    extension: 'jpg',
  },
}

describe('MarvelCharacterDetail.vue', () => {
  test('renders correctly', () => {
    const wrapper = mount(MarvelCharacterDetail, {
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
