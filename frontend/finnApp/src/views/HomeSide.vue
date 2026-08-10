<template>
  <section class="view-card">
    <h1>Velkommen til Finn</h1>
    <p>Dette er startsiden for appen, hvor du kan se de nyeste annonsene.</p>

    <ul>
      <li
        v-for="ad in adsStore.items"
        :key="ad.adId"
        @click="$router.push({ name: 'ad-details', params: { adId: ad.adId } })"
      >
        <img
          src="/public/placeholder.png"
          alt="Ad Image"
          style="max-width: 100%; height: auto; margin-top: 0.5rem"
        />
        <div>
          <strong>{{ ad.title }}</strong> - {{ ad.price }} kr<br />
          {{ ad.category }} - {{ ad.location }}<br />
          {{ ad.description }}
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useAdsStore } from '@/stores/ads';

const adsStore = useAdsStore();

// Load the ads from storage once the page appears -> the seed shows up on first run.
onMounted(() => {
  adsStore.load();
});
</script>

<style scoped>
.view-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}
li {
  cursor: pointer;
  margin-bottom: 1rem;
  gap: 1rem;
}
li:hover {
  background-color: #f0f0f0;
  border-radius: 8px;
}
ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
</style>
