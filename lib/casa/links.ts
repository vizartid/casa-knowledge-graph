import type { Note } from './types'

export const extractWikiLinks = (content: string) => Array.from(content.matchAll(/\[\[([^\]]+)\]\]/g), (match) => match[1].trim())

export function getBacklinks(note: Note, notes: Note[]) {
  return notes.filter((candidate) => candidate.id !== note.id && extractWikiLinks(candidate.content).some((title) => title.toLowerCase() === note.title.toLowerCase()))
}

export function resolveLinks(note: Note, notes: Note[]) {
  return extractWikiLinks(note.content).map((title) => ({ title, note: notes.find((item) => item.title.toLowerCase() === title.toLowerCase()) }))
}
