// Shared data shapes for the whole app.
// Every stored record has an id so the storage layer can treat them the same way.

export interface Entity {
  id: string
}

// A single marketplace listing.
export interface Ad extends Entity {
  title: string
  description: string
  price: number
  category: string
  location: string
  imageUrl: string
  sellerId: string
  createdAt: string // ISO date string, set when the ad is made
}

// A registered user of the site.
export interface User extends Entity {
  name: string
  email: string
}

// A message sent between two users about an ad.
export interface Message extends Entity {
  adId: string
  fromUserId: string
  toUserId: string
  body: string
  sentAt: string // ISO date string
}
