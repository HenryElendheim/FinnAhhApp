import { ref, reactive } from 'vue';
import { defineStore } from 'pinia'
import type { User } from '@/types/models';
import { createCollection } from '@/lib/storage';
import { v7 as uuidv7 } from "uuid";

const users = createCollection<User>('users');

export const useUsersStore = defineStore('users', () => {
  const items = ref<User[]>([]);
  const isLoggedIn = ref<boolean>(false);

  function setLoggedIn(state : boolean = false) {
    isLoggedIn.value = state;
  }
  function logout() {
    setLoggedIn(false);
  }

  function load() { items.value = users.getAll() };
  function create(data: Omit<User, 'userId' | 'createdAt'>) {
    users.add({ ...data, userId: uuidv7(), createdAt: new Date().toISOString() })
    load()
  }

  // Removes a user by id and refreshes state.
  function remove(id: string) {
    users.remove(id)
    load()
  }

  return { items, load, create, remove, isLoggedIn, setLoggedIn, logout }
})