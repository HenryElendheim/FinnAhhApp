// Store for marketplace ads.
//
// The store holds the ads in reactive state so the UI updates automatically,
// and leans on the shared storage layer for anything that touches localStorage.
// Users and messages get their own store the same way -> one collection each,
// no repeated storage code.

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { createCollection } from '@/lib/storage'
import type { Ad } from '@/types/models'
import {useUsersStore} from "@/stores/users";

// One line wires this store to its collection in storage.
const ads = createCollection<Ad>('ads')

export const useAdsStore = defineStore('ads', () => {
  // Reactive copy of the ads that the components render.
  const items = ref<Ad[]>([])

  // Loads the current ads from storage into reactive state.
  // Call this once when the app starts.
  function load() {
    items.value = ads.getAll()
  }

  // Creates a new ad, stamps the creation time, and refreshes state.
  function create(data: Omit<Ad, 'id' | 'createdAt'>) {
    ads.add({ ...data, createdAt: new Date().toISOString() })
    load()
  }

  // Removes an ad by id and refreshes state.
  function remove(id: string) {
    ads.remove(id)
    load()
  }

  return { items, load, create, remove }
})
