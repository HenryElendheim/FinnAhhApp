<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import seed from '@/data/db.json';

const route = useRoute();

const ad = computed(() => {
  const adId = Array.isArray(route.params.adId)
    ? route.params.adId[0]
    : route.params.adId;

  if (!adId) return null;

  return (
    (
      seed.ads as Array<{
        adId: string;
        title: string;
        description: string;
        price: number;
        category: string;
        location: string;
      }>
    ).find((item) => item.adId === adId) ?? null
  );
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
