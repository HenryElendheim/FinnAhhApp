// One small storage layer for the whole app.
//
// The idea:
//  - A committed seed (db.json) holds the shared starting data everyone boots with.
//  - On first run the seed is copied into localStorage.
//  - After that every read and write goes through localStorage, so changes
//    survive a page refresh on the demo machine.
//
// Nothing outside this file talks to localStorage directly. That means the day
// you swap to a real backend, only this file changes -> the stores and views
// stay exactly the same.
// YOOOOOOOOOYOOOOO
// Weeeeeee
import type { Entity } from '@/types/models'
import seed from '@/data/db.json'

// Reads a collection from localStorage. If it has never been saved before,
// the matching slice of the seed is written in first -> so the app is never empty.
function load<T>(key: string): T[] {
  const stored = localStorage.getItem(key)
  if (stored !== null) {
    return JSON.parse(stored) as T[]
  }

  // First run for this collection -> take the starting data from the seed.
  const initial = ((seed as Record<string, unknown>)[key] ?? []) as T[]
  localStorage.setItem(key, JSON.stringify(initial))
  return initial
}

// Writes the whole collection back to localStorage in one go.
function save<T>(key: string, items: T[]): void {
  localStorage.setItem(key, JSON.stringify(items))
}

// Builds a typed set of CRUD helpers for one collection (ads, users, messages...).
// Generic over the record type, so there is no repeated code per collection.
export function createCollection<T extends Entity>(key: string) {
  return {
    // Returns every record in the collection.
    getAll(): T[] {
      return load<T>(key)
    },

    // Returns a single record by id, or undefined if it does not exist.
    getById(id: string): T | undefined {
      return load<T>(key).find((item) => item.userId === id)
    },

    // Adds a new record. The caller sends everything except the id,
    // which is generated here -> so ids are always unique and consistent.
    add(data: Omit<T, 'id'>): T {
      const items = load<T>(key)
      const record = { ...data, userId: crypto.randomUUID() } as T
      items.push(record)
      save(key, items)
      return record
    },

    // Updates the record with the given id by merging in the changed fields.
    // Returns the updated record, or undefined if no record matched.
    update(id: string, changes: Partial<Omit<T, 'id'>>): T | undefined {
      const items = load<T>(key)
      const existing = items.find((item) => item.userId === id)
      if (existing === undefined) {
        return undefined
      }
      // Merge the changes onto the found record, keeping its id.
      const updated = { ...existing, ...changes } as T
      save(
        key,
        items.map((item) => (item.userId === id ? updated : item)),
      )
      return updated
    },

    // Removes the record with the given id. Returns true if something was removed.
    remove(id: string): boolean {
      const items = load<T>(key)
      const next = items.filter((item) => item.userId !== id)
      if (next.length === items.length) {
        return false
      }
      save(key, next)
      return true
    },
  }
}
