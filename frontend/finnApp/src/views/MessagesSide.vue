<template>
  <section class="view-card">
    <h1>Meldinger</h1>
    <div class="messages" v-if="meldinger.length > 0">
      <div
        v-for="melding in meldinger"
        :key="`${melding.adId}-${melding.sentAt}-${melding.fromUserId}`"
        class="message"
      >
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
import { ref } from 'vue';
import type { Message } from '@/types/models';

const meldinger = ref<Message[]>([]);

const fetchMeldinger = () => {
  meldinger.value = [
    {
      userId: 'u2',
      adId: 'a1',
      fromUserId: 'u2',
      toUserId: 'u1',
      body: 'Hei! Er sykkelen fortsatt tilgjengelig?',
      sentAt: '2026-08-08T10:30:00.000Z',
    },
    {
      userId: 'u1',
      adId: 'a1',
      fromUserId: 'u1',
      toUserId: 'u2',
      body: 'Hei! Ja, den er fortsatt tilgjengelig.',
      sentAt: '2026-08-08T11:00:00.000Z',
    },
    {
      userId: 'u1',
      adId: 'a2',
      fromUserId: 'u1',
      toUserId: 'u2',
      body: 'Hei! Jeg er interessert i sofaen. Kan vi avtale en visning?',
      sentAt: '2026-08-09T09:15:00.000Z',
    },
  ];
};

fetchMeldinger();
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
.message {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
}
</style>
