<template>
  <section class="view-card">
    <h1>Lag annonse</h1>
    <p>Opprett en ny annonse og del den med andre.</p>

    <!-- @submit.prevent stops the browser from reloading the page on submit. -->
    <form @submit.prevent="submit">
      <div class="field">
        <label for="title">Tittel</label>
        <input id="title" v-model="form.title" type="text" required />
      </div>

      <div class="field">
        <label for="price">Pris (kr)</label>
        <input id="price" v-model.number="form.price" type="number" min="0" required />
       
      </div>

      <label name="category">
        Kategori
      </label>
      <select name="categories" id="">
        <option value="vehicles">Fartøy</option>
        <option value="electronics">Elektronikk</option>
        <option value="clothing">Klær</option>
        <option value="furniture">Møbler</option>
        <option value="leisure">Fritid</option>
        <option value="sports">Sport</option>
      </select>

      <label>
        Sted
        <input v-model="form.location" type="text" required />
      </label>
      <label>
        Bilde-URL
        <input v-model="form.imageUrl" type="text" required />
      </label>

      <label>
        Beskrivelse
        <textarea v-model="form.description" required></textarea>
      </label>

      <button type="submit">Publiser annonse</button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAdsStore } from '@/stores/ads';
import { v7 as uuidv7 } from 'uuid';

const router = useRouter();
const adsStore = useAdsStore();

// Holds what the user types. Starts empty each time the page opens.
const form = reactive({
  title: '',
  price: 0,
  category: [] as string[],
  location: '',
  description: '',
  imageUrl: '',
});

// Saves the ad, then sends the user to the home page to see it in the list.
function submit() {
  adsStore.create({
    title: form.title,
    price: form.price,
    category: form.category,
    location: form.location,
    description: form.description,
    imageUrl: form.imageUrl, // use the image URL from the form
    userId: 'u1', // TRENGER EN ISLOGGEDIN (forslag, ikke ekte navn eller eksisterende variabel)
    adId: uuidv7(), // placeholder until login exists -> everything is posted as Martin
  });
  router.push('/');
}
</script>

<style scoped>
.view-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

/* Stack the fields so each label and its input sit on their own line. */
form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 400px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>
