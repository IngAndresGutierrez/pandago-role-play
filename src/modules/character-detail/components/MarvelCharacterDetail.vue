<template>
  <v-container class="py-4">
    <v-row justify="center">
      <v-col cols="12" md="8">

        <v-alert v-if="errorFetch" class="mb-4" prominent type="warning">
          Personaje no encontrado
          <v-btn class="ml-4" color="primary" @click="goHome">
            Regresar
          </v-btn>
        </v-alert>

        <v-card v-if="character">
          <v-container>
            <v-row class="align-center">
              <v-col class="d-flex align-center" cols="2">
                <v-btn icon @click="goBack">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </v-col>

              <v-col class="d-flex justify-center" cols="8">
                <v-card-title>{{ character.name }}</v-card-title>
              </v-col>

              <v-col class="d-flex align-center" cols="2" />
            </v-row>
          </v-container>

          <v-img :alt="character.name" class="mb-4" height="400px" :src="getImageFromThumbnail(character.thumbnail)" />

          <v-card-text v-if="character.description">{{ character.description }}</v-card-text>
          <v-card-text v-else>Descripción no disponible.</v-card-text>

          <v-card>
            <v-tabs v-model="tab" bg-color="primary">
              <v-tab value="comics">Comics</v-tab>
              <v-tab value="series">Series</v-tab>
              <v-tab value="events">Eventos</v-tab>
              <v-tab value="histories">Historias</v-tab>
            </v-tabs>

            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="comics">
                <MarvelCharacterDetailComics />
              </v-tabs-window-item>

              <v-tabs-window-item value="series">
                <MarvelCharacterDetailSeries />
              </v-tabs-window-item>

              <v-tabs-window-item value="events">
                <MarvelCharacterDetailEvents />
              </v-tabs-window-item>

              <v-tabs-window-item value="histories">
                <MarvelCharacterDetailStories />
              </v-tabs-window-item>
            </v-tabs-window>

          </v-card>
        </v-card>

        <v-skeleton-loader
          v-if="!character && !errorFetch"
          class="mx-auto border"
          max-height="400"
          max-width="400"
          type="image, article"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import { Character } from '../models/characters'
  import marvelService from '../services/character'
  import { getImageFromThumbnail } from '../../common/utils/images'
  import MarvelCharacterDetailComics from './MarvelCharacterDetailComics.vue'
  import MarvelCharacterDetailSeries from './MarvelCharacterDetailSeries.vue'
  import MarvelCharacterDetailEvents from './MarvelCharacterDetailEvents.vue'
  import MarvelCharacterDetailStories from './MarvelCharacterDetailStories.vue'

  const route = useRoute()
  const router = useRouter()
  const tab = ref('comics')
  const character = ref<Character | null>(null)
  const errorFetch = ref()

  const fetchCharacterDetail = async () => {
    if (route && route.params && 'id' in route.params) {
      const characterId = Number(route.params.id)

      try {
        const response = await marvelService.getCharacterDetail(characterId)
        if (response) {
          character.value = response
        } else {
          errorFetch.value = 'Personaje no encontrado'
        }
      } catch (err: any) {
        errorFetch.value = err.message || 'Error al obtener el personaje'
      }
    }
  }

  const goBack = () => {
    router.back()
  }

  const goHome = () => {
    router.push('/')
  }

  onMounted(fetchCharacterDetail)

</script>

<style scoped>
.v-card-title {
  font-size: 24px;
  font-weight: bold;

}

.v-img {
  border-radius: 8px;
}
</style>
