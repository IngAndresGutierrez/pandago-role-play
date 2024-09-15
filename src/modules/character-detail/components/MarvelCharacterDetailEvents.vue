<template>
  <v-container class="py-4">
    <v-row justify="center">
      <v-col cols="12">
        <v-carousel v-if="characterEvents.length" height="auto" hide-delimiters>
          <v-carousel-item v-for="(events, index) in characterEvents" :key="index">
            <h3 class="title">{{ events.title }}</h3>
            <v-card-text>{{ events.description }}</v-card-text>
            <v-img :alt="events.title" height="300px" :src="getImageFromThumbnail(events.thumbnail)" />
          </v-carousel-item>
        </v-carousel>
        <v-container v-if="loading">
          <v-row justify="center">
            <v-progress-circular color="primary" indeterminate />
          </v-row>
        </v-container>
        <v-alert v-if="!characterEvents.length && !loading" type="info">Este personaje no aparece en ningún evento.</v-alert>
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
  const characterEvents = ref([])
  const loading = ref(false)

  const fetchCharacterDetailEvents = async () => {
    loading.value = true

    if (route.params.id) {
      const characterId = Number(route.params.id)
      characterEvents.value = await marvelService.getCharacterDetailEvents(characterId)
    }

    loading.value = false
  }

  onMounted(fetchCharacterDetailEvents)

</script>

<style scoped>
.title {
  text-align: center;
}
</style>
