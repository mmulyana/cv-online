import { atom } from 'jotai'

export const userAtom = atom<Record<string, string> | null>(null)
