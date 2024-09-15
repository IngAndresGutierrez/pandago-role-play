import 'vuetify/styles'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { describe, expect, test } from 'vitest'

import MarvelCharactersList from '@/modules/characters/components/MarvelCharactersList.vue'

const vuetify = createVuetify()

global.ResizeObserver = require('resize-observer-polyfill')

const mockCharacters = [{
  id: 1,
  name: 'Test character',
  thumbnail: {
    path: 'https://mypath.com/images',
    extension: 'jpg',
  },
}]

describe('MarvelCharactersList.vue', () => {
  test('renders correctly', () => {
    const wrapper = mount(MarvelCharactersList, {
      global: {
        plugins: [vuetify],
      },
      props: {
        character: mockCharacters,
      },
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
