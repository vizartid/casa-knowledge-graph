'use client'

export type WorkspaceView = 'note' | 'capture' | 'search' | 'files' | 'graph' | 'chat' | 'tags' | 'templates' | 'settings'
export type CasaState = 'idle' | 'listening' | 'processing' | 'speaking' | 'done' | 'error'
export type NoteType = 'static' | 'live'
export type CasaIntent = 'NOTE_BARU' | 'TAMBAH_KE_NOTE_AKTIF' | 'CARI_NOTE' | 'BRAINSTORM_CHAT' | 'LAINNYA'

export type FieldScores = Record<'backend' | 'frontend' | 'aiEngineer' | 'mlEngineer' | 'devops' | 'iot' | 'network' | 'instrumentationAutomation', number>

export interface NoteAiMeta {
  summary?: string
  suggestedTags?: string[]
  suggestedLinks?: string[]
}

export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  category: string
  noteType: NoteType
  createdAt: number
  updatedAt: number
  fieldScores: FieldScores
  links: string[]
  embedding?: number[]
  aiMeta: NoteAiMeta
}

export interface CaptureTemplate {
  id: string
  name: string
  promptText: string
  isDefault: boolean
}

export interface CasaSettings {
  apiKey: string
  shortcut: string
  voiceEnabled: boolean
  voiceLocale: 'en-US' | 'en-GB'
}

export interface CaptureDraft extends Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'embedding'> {}
export interface VoiceResult { intent: CasaIntent; spokenResponse: string; query?: string; note?: CaptureDraft; appendText?: string }

export const emptyFields: FieldScores = { backend: 0, frontend: 0, aiEngineer: 0, mlEngineer: 0, devops: 0, iot: 0, network: 0, instrumentationAutomation: 0 }
