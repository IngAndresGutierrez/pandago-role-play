import axios from 'axios'
import { useMemoize } from '@vueuse/core'

import { getQueryParamsApi } from '@/modules/common/utils/query-params'

const BASE_URL = 'https://gateway.marvel.com/v1/public'

const getCharacters = useMemoize(
  async (offset: number, limit: number, nameStartsWith?: string | null, series?: string, comics?: string) => {
    let url = `${BASE_URL}/characters?${getQueryParamsApi()}&limit=${limit}&offset=${offset}`

    if (nameStartsWith) {
      url = `${url}&nameStartsWith=${nameStartsWith}`
    }

    if (series) {
      url = `${url}&series=${series}`
    }

    if (comics) {
      url = `${url}&comics=${comics}`
    }

    try {
      const response = await axios.get(url)
      return response.data.data
    } catch (error) {
      console.error('Error fetching characters:', error)
      throw error
    }
  })

export default { getCharacters }
