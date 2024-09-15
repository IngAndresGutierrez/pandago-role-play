<template>
  <v-app>
    <v-container>
      <v-row class="mb-4" justify="center">
        <v-col
          cols="12"
          md="6"
          sm="10"
        >
          <v-text-field
            v-model="searchCharacter"
            clearable
            hint="Ingresa el nombre del personaje"
            label="Buscar personaje"
            prepend-inner-icon="mdi-magnify"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="10"
        >
          <v-select
            v-model="selectedComics"
            clearable
            :disabled="selectedSeries"
            item-title="title"
            item-value="id"
            :items="comicsOptions"
            label="Comics"
            prepend-inner-icon="mdi-filter"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="10"
        >
          <v-select
            v-model="selectedSeries"
            clearable
            :disabled="selectedComics"
            item-title="title"
            item-value="id"
            :items="seriesOptions"
            label="Series"
            prepend-inner-icon="mdi-filter"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="loading" fluid>
      <v-row>
        <v-col
          v-for="character in dummySkeleton"
          :key="character"
          cols="12"
          lg="3"
          md="4"
          sm="6"
        >
          <v-skeleton-loader class="mx-auto border" max-width="300" type="image, article" />
        </v-col>
      </v-row>
    </v-container>

    <v-row justify="center">
      <v-col cols="10">
        <v-alert v-if="!characters.length && !loading" type="info">No existe información para los filtros seleccionados.</v-alert>
      </v-col>
    </v-row>

    <v-container v-if="characters.length" fluid>
      <v-row>
        <v-col
          v-for="character in characters"
          :key="character.id"
          cols="12"
          lg="3"
          md="4"
          sm="6"
        >
          <MarvelCharacterCard :character="character" />
        </v-col>
      </v-row>
    </v-container>

    <v-overlay
      class="align-center justify-center"
      :model-value="loading"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      />
    </v-overlay>

    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="currentPage"
                class="my-4"
                :length="totalPages"
              />
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import debounce from 'lodash/debounce'

  import marvelService from '../services/characters'
  import marvelCommonService from '../../common/services/filters'

  import type { Character } from '../models/characters'
  import MarvelCharacterCard from './MarvelCharacterCard.vue'

  const characters = ref<Character[]>([])
  const dummySkeleton = [1, 2, 3, 4, 5, 6, 7, 8]
  const currentPage = ref(1)
  const totalPages = ref(1)
  const limit = 20
  const loading = ref(false)
  const searchCharacter = ref(null)
  const selectedComics = ref()
  const selectedSeries = ref()
  const seriesOptions = ref([])
  const comicsOptions = ref([])

  /* Fetches a list of Marvel characters based on the current page, limit, search term, selected series, and selected comics. */
  const fetchCharacters = async () => {
    loading.value = true

    const offset = (currentPage.value - 1) * limit
    const newCharacters = await marvelService.getCharacters(
      offset,
      limit,
      searchCharacter.value,
      selectedSeries.value,
      selectedComics.value,
    )
    totalPages.value = Math.ceil(newCharacters.total / limit)
    characters.value = newCharacters.results
    loading.value = false
  }

  const fetchSeries = async () => {
    const newSeries = await marvelCommonService.getSeries()
    seriesOptions.value = newSeries
  }

  const fetchComics = async () => {
    const newComics = await marvelCommonService.getComics()
    comicsOptions.value = newComics
  }

  const initfetchData = () => {
    fetchCharacters()
    fetchComics()
    fetchSeries()
  }

  /*
  * Create a debounced version of the `fetchCharacters` function with a delay of 500 milliseconds.
  * The debounced function ensures that `fetchCharacters` is not called more frequently than once every 500 milliseconds,
  * even if multiple calls are made in quick succession. This helps in reducing the number of API requests and improves performance.
  */
  const debouncedFetchCharacters = debounce(() => {
    currentPage.value = 1
    fetchCharacters()
  }, 500)

  onMounted(initfetchData)
  watch(searchCharacter, debouncedFetchCharacters)
  watch([currentPage, selectedComics, selectedSeries], fetchCharacters)
  watch([selectedComics, selectedSeries], () => currentPage.value = 1)

</script>
