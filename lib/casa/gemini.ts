import type { CaptureDraft, Note, VoiceResult } from './types'
import { emptyFields } from './types'

const models = ['gemini-2.5-flash']
const taxonomy = `Backend Engineering; Frontend Engineering; AI Engineering; Machine Learning Engineering; DevOps; IoT; Network Engineering; Instrumentation & Automation.`

async function generate(apiKey: string, prompt: string, json = false) {
  if (!apiKey.trim()) throw new Error('Tambahkan Gemini API key di Settings terlebih dahulu.')
  let lastError = 'Casa gagal terhubung ke Gemini.'
  for (const model of models) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: json ? { responseMimeType: 'application/json', temperature: 0.2 } : { temperature: 0.5 } }) })
    if (response.ok) { const data = await response.json(); return data.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text ?? '').join('') || '' }
    if (response.status === 400 || response.status === 403) throw new Error('API key Gemini tidak valid atau tidak memiliki akses.')
    lastError = `Gemini ${model} merespons ${response.status}.`
  }
  throw new Error(lastError)
}

export const askGemini = (apiKey: string, prompt: string) => generate(apiKey, prompt)
export const testGemini = (apiKey: string) => generate(apiKey, 'Reply with exactly: Casa connected.')
export const summarizeNote = (apiKey: string, title: string, content: string) => generate(apiKey, `Summarize this note in Indonesian with 3 key points and one next action. Title: ${title}\n${content}`)

function parseJson<T>(raw: string): T { return JSON.parse(raw.replace(/^```json\s*|\s*```$/g, '').trim()) as T }

export async function splitCapture(apiKey: string, text: string, template = ''): Promise<CaptureDraft[]> {
  const raw = await generate(apiKey, `Split the source into atomic second-brain notes. ${template}\nTaxonomy: ${taxonomy}\nReturn ONLY a JSON array. Each item: {title,content,tags,category,noteType:"static"|"live",fieldScores:{backend,frontend,aiEngineer,mlEngineer,devops,iot,network,instrumentationAutomation},links:[],aiMeta:{suggestedTags:[],suggestedLinks:[]}}. Scores are 0..1. Preserve useful [[wikilinks]]. Source:\n${text}`, true)
  return parseJson<CaptureDraft[]>(raw).map((draft) => ({ ...draft, tags: draft.tags ?? [], category: draft.category || 'Inbox', noteType: draft.noteType || 'live', fieldScores: { ...emptyFields, ...draft.fieldScores }, links: draft.links ?? [], aiMeta: draft.aiMeta ?? {} }))
}

export async function parseVoiceIntent(apiKey: string, transcript: string, activeNote: Note | null, notes: Note[]): Promise<VoiceResult> {
  const index = notes.map((note) => `${note.title}: ${note.content.slice(0, 240)}`).join('\n')
  const raw = await generate(apiKey, `You are Casa, a concise female English-speaking thinking partner. Classify the user's voice command and answer in natural English. Return ONLY JSON: {intent:"NOTE_BARU"|"TAMBAH_KE_NOTE_AKTIF"|"CARI_NOTE"|"BRAINSTORM_CHAT"|"LAINNYA",spokenResponse,query?,appendText?,note?}. If creating a note, note follows this shape: {title,content,tags,category,noteType,fieldScores,links,aiMeta}. Taxonomy: ${taxonomy}. Active note: ${activeNote?.title ?? 'none'}. Brain context:\n${index}\nUser said: ${transcript}`, true)
  return parseJson<VoiceResult>(raw)
}
