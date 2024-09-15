import axios from 'axios'

import { getQueryParamsApi } from '@/modules/common/utils/query-params'

const BASE_URL = 'https://gateway.marvel.com/v1/public'

const getSeries = async () => {
  const url = `${BASE_URL}/series?${getQueryParamsApi()}&limit=50`

  try {
    const response = await axios.get(url)
    return response.data.data.results
  } catch (error) {
    console.error('Error fetching series:', error)
    throw error
  }
}

const getComics = async () => {
  const url = `${BASE_URL}/comics?${getQueryParamsApi()}&limit=50`

  try {
    const response = await axios.get(url)
    return response.data.data.results
  } catch (error) {
    console.error('Error fetching comics:', error)
    throw error
  }
}

export default { getSeries, getComics }
