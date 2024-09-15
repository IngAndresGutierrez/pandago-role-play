<template>
  <v-container class="py-4">
    <v-row justify="center">
      <v-col cols="12">
        <v-carousel v-if="characterStories.length" height="auto" hide-delimiters>
          <v-carousel-item v-for="(stories, index) in characterStories" :key="index">
            <v-card-title v-if="stories?.title">{{ stories.title }}</v-card-title>
            <v-card-text v-if="stories?.description">{{ stories.description }}</v-card-text>

            <v-card-title v-if="stories?.creators?.items?.length" class="title">Creadores</v-card-title>

            <v-list v-if="stories?.creators?.items?.length" lines="two">
              <v-list-item
                v-for="creator in stories.creators.items"
                :key="creator.name"
                :subtitle="creator.role"
                :title="creator.name"
              />
            </v-list>
          </v-carousel-item>
        </v-carousel>
        <v-container v-if="loading">
          <v-row justify="center">
            <v-progress-circular color="primary" indeterminate />
          </v-row>
        </v-container>
        <v-alert v-if="!characterStories.length && !loading" type="info">Este personaje no aparece en ninguna
          historia.</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  import marvelService from '../services/character'

  const route = useRoute()
  const characterStories = ref(null)
  const loading = ref(false)

  const fetchCharacterDetailStories = async () => {
    loading.value = true

    if (route.params.id) {
      const characterId = Number(route.params.id)
      characterStories.value = await marvelService.getCharacterDetailStories(characterId)
    }

    loading.value = false
  }

  onMounted(fetchCharacterDetailStories)

</script>

<style scoped>
.title {
  text-align: center;
}
</style>
