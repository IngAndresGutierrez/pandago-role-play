<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      :alt="character.name"
      cover
      height="200px"
      :src="getImageFromThumbnail(character.thumbnail)"
    />

    <v-card-title>
      {{ character.name }}
    </v-card-title>

    <v-card-actions>
      <v-btn color="orange-lighten-2" text="Ver Más" @click="goToCharacterDetail" />

      <v-spacer />

      <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show" />
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider />

        <v-card-text>
          {{ character.description || 'Descripción no disponible' }} </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
  import { getImageFromThumbnail } from '../../common/utils/images'

  const show = ref(false)
  const router = useRouter()

  const props = defineProps({
    character: {
      type: Object,
      required: true,
    },
  })

  const goToCharacterDetail = () => {
    if (props.character && props.character.id) {
      router.push(`/character/${props.character.id}`)
    } else {
      console.error('Character data is missing or invalid')
    }
  }

</script>
