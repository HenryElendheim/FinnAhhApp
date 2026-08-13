<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAdsStore } from '@/stores/ads';
import { useUsersStore } from "@/stores/users";

const route = useRoute();
const adsStore = useAdsStore();
const usersStore = useUsersStore();

// const userName = [usersStore.items, adsStore.items].map((userAndAd, i) => )

const creatorName = computed(() => {
  return usersStore.items.find((user) => user.userId === ad.value?.userId)?.name || 'Ukjent selgeren';
})

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
  <div>
    <button @click="$router.back()">Tilbake</button>
  </div>
  <!-- <div v-for="ad in adsStore.items" class="ad"> -->
  <div v-if="ad" class="ad">
    <div class="left">
      <img :src="ad.imageUrl || '/public/placeholder.png'" alt="Ad Image" />
    </div>
    <div class="right">
      <h1>{{ ad.title }}</h1>
      <p>Til salgs</p>
      <h2>
        <strong>{{ ad.price }} kr</strong>
      </h2>
      <p>{{ ad.description }}</p>
      <p>{{ ad.category }}</p>
      <!-- <p>Selger: {{ userName }}</p> -->
      <p>Selger: {{ creatorName }}</p>
    </div>
  </div>
  <p v-else>Annonsen ble ikke funnet.</p>
</template>

<style scoped>
button {
  margin-bottom: 1rem;
  color: #ffffff;
  background-color: #1d4ed8;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.ad {
  display: flex;
  gap: 1rem;
}
.left {
  flex: 1;
}
.right {
  flex: 2;
}
.ad img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
