import axios from 'axios'

import { Character } from '../models/characters'
import { getQueryParamsApi } from '@/modules/common/utils/query-params'

const BASE_URL = 'https://gateway.marvel.com/v1/public'

const getCharacters = async (offset: number, limit: number, nameStartsWith?:string, series?:string, comics?:string): Promise<Character[]> => {
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
    return response.data.data as Character[]
  } catch (error) {
    console.error('Error fetching characters:', error)
    throw error
  }
}

export default { getCharacters }
