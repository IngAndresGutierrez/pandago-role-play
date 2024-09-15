<template>
  <v-container class="py-4">
    <v-row justify="center">
      <v-col cols="12">
        <v-carousel v-if="characterSeries.length" height="auto" hide-delimiters>
          <v-carousel-item v-for="(series, index) in characterSeries" :key="index">
            <h3 class="title">{{ series.title }}</h3>
            <v-card-text>{{ series.description }}</v-card-text>
            <v-img :alt="series.title" height="350px" :src="getImageFromThumbnail(series.thumbnail)" />
          </v-carousel-item>
        </v-carousel>
        <v-container v-if="loading">
          <v-row justify="center">
            <v-progress-circular color="primary" indeterminate />
          </v-row>
        </v-container>
        <v-alert v-if="!characterSeries.length && !loading" type="info">Este personaje no aparece en ninguna serie.</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  import marvelService from '../services/character'
  import { getImageFromThumbnail } from '../../common/utils/images'

  const route = useRoute()
  const characterSeries = ref([])
  const loading = ref(false)

  const fetchCharacterDetailSeries = async () => {
    loading.value = true

    if (route.params.id) {
      const characterId = Number(route.params.id)
      characterSeries.value = await marvelService.getCharacterDetailSeries(characterId)
    }

    loading.value = false
  }

  onMounted(fetchCharacterDetailSeries)

</script>

<style scoped>
.title {
  text-align: center;
}
</style>
