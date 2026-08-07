<template>
  <section class="view-card">
    <h1>Meldinger</h1>
    <div class="messages" v-if="meldinger.length > 0">
      <div v-for="melding in meldinger" :key="melding.adId" class="message">
        <p><strong>Fra:</strong> {{ melding.fromUserId }}</p>
        <p><strong>Til:</strong> {{ melding.toUserId }}</p>
        <p><strong>Melding:</strong> {{ melding.body }}</p>
        <p><strong>Sendt:</strong> {{ melding.sentAt }}</p>
      </div>
    </div>
      <div v-else>
        <p>Ingen meldinger å vise.</p>
      </div>
    
  </section>
</template>

<script lang="ts" setup>
import type {Message} from '@/types/models'
import { ref } from 'vue'
const props = defineProps<{
  userId: string;
}>()
const meldinger = ref<Message[]>([])

const fetchMeldinger = () => {
  meldinger.value = [
    { adId: "1", fromUserId:'1', toUserId: "2", body: 'Hei! Hvordan går det?', sentAt: '2024-06-01T10:00:00Z', userId: '1' },
    { adId: "2", fromUserId:'2', toUserId: "1", body: 'Hei! Det går bra, takk! Hva med deg?', sentAt: '2024-06-01T10:05:00Z', userId: '2' },
    { adId: "3", fromUserId:'1', toUserId: "2", body: 'Jeg har det også bra. Har du sett den nye filmen?', sentAt: '2024-06-01T10:10:00Z', userId: '1' },
  ]
}



</script>

<style scoped>
.view-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}
.messages {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.message{
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
}
</style>

