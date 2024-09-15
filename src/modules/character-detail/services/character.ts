import axios from 'axios'
import { getQueryParamsApi } from '@/modules/common/utils/query-params'

const BASE_URL = 'https://gateway.marvel.com/v1/public'

export const getCharacterDetail = async (characterId: number) => {
  const url = `${BASE_URL}/characters/${characterId}?${getQueryParamsApi()}`

  try {
    const response = await axios.get(url)

    return response.data.data.results[0]
  } catch (error) {
    console.error('Error fetching character details:', error)
    throw error
  }
}

export const getCharacterDetailComics = async (characterId: number) => {
  const url = `${BASE_URL}/characters/${characterId}/comics?${getQueryParamsApi()}`

  try {
    const response = await axios.get(url)

    return response.data.data.results
  } catch (error) {
    console.error('Error fetching character comics:', error)
    throw error
  }
}

export const getCharacterDetailSeries = async (characterId: number) => {
  const url = `${BASE_URL}/characters/${characterId}/series?${getQueryParamsApi()}`

  try {
    const response = await axios.get(url)

    return response.data.data.results
  } catch (error) {
    console.error('Error fetching character series:', error)
    throw error
  }
}

export const getCharacterDetailEvents = async (characterId: number) => {
  const url = `${BASE_URL}/characters/${characterId}/events?${getQueryParamsApi()}`

  try {
    const response = await axios.get(url)

    return response.data.data.results
  } catch (error) {
    console.error('Error fetching character events:', error)
    throw error
  }
}

export const getCharacterDetailStories = async (characterId: number) => {
  const url = `${BASE_URL}/characters/${characterId}/stories?${getQueryParamsApi()}`

  try {
    const response = await axios.get(url)

    return response.data.data.results
  } catch (error) {
    console.error('Error fetching character stories:', error)
    throw error
  }
}

export default {
  getCharacterDetail,
  getCharacterDetailComics,
  getCharacterDetailSeries,
  getCharacterDetailEvents,
  getCharacterDetailStories,
}
