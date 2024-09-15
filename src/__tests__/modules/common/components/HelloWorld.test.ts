import 'vuetify/styles'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { describe, expect, test } from 'vitest'

import HelloWorld from '@/modules/common/components/HelloWorld.vue'

const vuetify = createVuetify()

describe('HelloWorld.vue', () => {
  test('renders correctly', () => {
    const wrapper = mount(HelloWorld, {
      global: {
        plugins: [vuetify],
      },
      props: {
      },
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
