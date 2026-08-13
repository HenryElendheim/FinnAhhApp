<template>
  <section class="view-card">
    <h1>Velkommen til Finn</h1>
    <p>Dette er startsiden, hvor du kan se de nyeste annonsene.</p>
    <p>Her kan du søke etter annonser:</p>
    <p class="search">
      <input type="text" name="search" id="" placeholder="Søkeord" v-model="form.words">
      <input type="text" name="search" id="" placeholder="Søk by" v-model="form.city">
      <select v-model="form.category" name="categories">
        <option value="" selected disabled>Velg Kategori</option>
        <!-- <option v-for="category in categories">{{ category }}</option> -->
        <option value="Fartøy">Fartøy</option>
        <option value="Elektronikk">Elektronikk</option>
        <option value="Klær">Klær</option>
        <option value="Møbler">Møbler</option>
        <option value="Fritid">Fritid</option>
        <option value="Sport">Sport</option>
      </select>

      <button @click="
        form.words = '';
      form.category = '';
      form.city = ''
        ">
        Reset
      </button>
    </p>
    <ul>
      <li v-for="ad in filterAds()" :key="ad.adId"
        @click="$router.push({ name: 'ad-details', params: { adId: ad.adId } })">
        <img class="ad-image" :src="ad.imageUrl || '/public/placeholder.png'" alt="Ad Image" />
        <div>
          <strong>{{ ad.price }} kr</strong><br />
          {{ ad.title }}<br />
          <!-- {{ ad.category }}<br /> -->
          {{ ad.location }}<br />
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { onMounted } from 'vue';
import { useAdsStore } from '@/stores/ads';

const adsStore = useAdsStore();

const categories = ["Møbler", "Elektronikk", "Klær", "Fritid", "Sport", "Fartøy"];

const form = reactive({
  words: "",
  category: "",
  city: ""
})

function filterAds() {
  const itemsArray = adsStore.items;
  return itemsArray.filter((ad, i) => {
    const matchingTitle = ad.title.toLowerCase().includes(form.words.toLowerCase());
    const matchingCity = ad.location.toLowerCase().includes(form.city.toLowerCase());
    const matchingCategory = !form.category || ad.category === form.category;

    return matchingTitle
      && matchingCategory
      && matchingCity
      && (matchingTitle && matchingCity)
      && (matchingCity && matchingCategory)
      && (matchingTitle && matchingCategory)
      && (matchingTitle && matchingCategory && matchingCity)
  })

}

function sortAdsByOldness() {
  const itemsArray = adsStore.items;

  return itemsArray.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

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
  display: flex;
  flex-direction: column;

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

.ad-image {
  max-width: 100%;
  height: auto;
  margin-top: 0.5rem;
  border-radius: 8px;
  object-fit: cover;
  aspect-ratio: 4 / 3;
}

.search {
  display: flex;
  gap: 0.2rem;
  margin-bottom: 1rem;
}
</style>
