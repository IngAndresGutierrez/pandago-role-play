<template>
  <v-container class="py-4">
    <v-row justify="center">
      <v-col cols="12">
        <v-carousel v-if="characterComics.length" height="auto" hide-delimiters>
          <v-carousel-item v-for="(comic, index) in characterComics" :key="index">
            <v-row>
              <v-col cols="12">
                <h3 class="title">{{ comic.title }}</h3>
              </v-col>
            </v-row>
            <v-img :alt="comic.title" height="300px" :src="getImageFromThumbnail(comic.thumbnail)" />
            <v-row>
              <v-col cols="12">
                <h3 v-if="comic.prices.length" class="mt-2 mb-2 text-center">${{ comic.prices[0].price }}</h3>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
        <v-container v-if="loading">
          <v-row justify="center">
            <v-progress-circular color="primary" indeterminate />
          </v-row>
        </v-container>
        <v-alert v-if="!characterComics.length && !loading" type="info">Este personaje no aparece en ningún cómic.</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  import { Comic } from '../models/comics'
  import marvelService from '../services/character'
  import { getImageFromThumbnail } from '../../common/utils/images'

  const route = useRoute()
  const characterComics = ref<Comic[]>([])
  const loading = ref(false)

  const fetchCharacterDetailComics = async () => {
    loading.value = true

    if (route.params && 'id' in route.params) {
      const characterId = Number(route.params.id)
      characterComics.value = await marvelService.getCharacterDetailComics(characterId)
    }

    loading.value = false
  }

  onMounted(fetchCharacterDetailComics)

</script>

<style scoped>
.title {
  text-align: center;
  padding-bottom: 28px;
}
</style>
