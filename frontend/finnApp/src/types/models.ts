// Shared data shapes for the whole app.
// Every stored record has an id so the storage layer can treat them the same way.

export interface Entity {
  userId: string
}

// A single marketplace listing.
export interface Ad extends Entity {
  title: string
  description: string
  price: number
  category: string
  location: string
  imageUrl: string
  adId: string
  createdAt: string // ISO date string, set when the ad is made
}

// A registered user of the site.
export interface User extends Entity {
  name: string
  email: string
  password: string
  ads: Ad[]
}

// A message sent between two users about an ad.
export interface Message extends Entity {
  adId: string
  fromUserId: string
  toUserId: string
  body: string
  sentAt: string // ISO date string
}
