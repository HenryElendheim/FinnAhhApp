<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAdsStore } from '@/stores/ads';

const route = useRoute();
const adsStore = useAdsStore();

onMounted(() => {
  adsStore.load();
});

const ad = computed(() => {
  const adId = Array.isArray(route.params.adId)
    ? route.params.adId[0]
    : route.params.adId;

  if (!adId) return null;

  return adsStore.items.find((item) => item.adId === adId) ?? null;
});
</script>

<template>
  <div v-if="ad">
    <h1>{{ ad.title }}</h1>
    <p>{{ ad.price }} kr</p>
    <p>{{ ad.description }}</p>
  </div>
  <p v-else>Annonsen ble ikke funnet.</p>
</template>

<style scoped></style>
