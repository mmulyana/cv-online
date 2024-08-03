import { atom } from 'jotai'

export type User = {
  username: string
}
export const userAtom = atom<User | null>(null)
