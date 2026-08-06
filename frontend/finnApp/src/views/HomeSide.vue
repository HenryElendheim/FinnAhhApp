<template>
  <section class="view-card">
    <h1>Velkommen til Finn</h1>
    <p>Dette er startsiden for appen, hvor du kan se de nyeste annonsene.</p>

    <!-- One block per ad. Just the raw fields for now, styling comes later. -->
    <ul>
      <li v-for="ad in adsStore.items" :key="ad.id">
        <strong>{{ ad.title }}</strong> - {{ ad.price }} kr<br />
        {{ ad.category }} - {{ ad.location }}<br />
        {{ ad.description }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useAdsStore } from '@/stores/ads'

const adsStore = useAdsStore()

// Load the ads from storage once the page appears -> the seed shows up on first run.
onMounted(() => {
  adsStore.load()
})
</script>

<style scoped>
.view-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}
</style>
