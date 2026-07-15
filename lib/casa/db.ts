import { openDB } from 'idb'
import type { CaptureTemplate, FieldScores, Note } from './types'
import { emptyFields } from './types'
import { extractWikiLinks } from './links'

const day = 86400000
const now = Date.now()
const score = (values: Partial<FieldScores>): FieldScores => ({ ...emptyFields, ...values })
const sample = (id: string, title: string, content: string, tags: string[], category: string, noteType: 'static' | 'live', fieldScores: FieldScores, age: number): Note => ({ id, title, content, tags, category, noteType, fieldScores, createdAt: now - age * day, updatedAt: now - Math.max(1, age - 1) * day, links: extractWikiLinks(content), aiMeta: {} })

export const seedNotes: Note[] = [
  sample('zero-downtime','Zero-Downtime Deployment Strategy','Blue-green deployment keeps traffic stable while a release warms up. Connect this with [[Kubernetes Production Checklist]] and [[Distributed Systems Notes]].',['devops','backend'],'Engineering','static',score({backend:.8,devops:1,network:.35,instrumentationAutomation:.55}),18),
  sample('kubernetes','Kubernetes Production Checklist','Validate probes, budgets, autoscaling, secrets, observability, and rollback. Refer to [[Zero-Downtime Deployment Strategy]].',['devops','automation'],'Engineering','live',score({backend:.5,devops:1,network:.45,instrumentationAutomation:.8}),16),
  sample('distributed','Distributed Systems Notes','Availability is a product decision disguised as architecture. Failure domains should be explicit.',['backend','network'],'Research','live',score({backend:1,aiEngineer:.15,devops:.45,network:.8}),15),
  sample('rag','RAG Evaluation Playbook','Evaluate retrieval separately from generation. Track groundedness, recall, and answer usefulness. Link to [[Vector Search Trade-offs]].',['ai','rag'],'AI Lab','live',score({backend:.35,aiEngineer:1,mlEngineer:.65}),14),
  sample('vectors','Vector Search Trade-offs','HNSW favors low-latency recall while flat search is useful as an evaluation baseline.',['ml','search'],'AI Lab','static',score({backend:.4,aiEngineer:.7,mlEngineer:1}),13),
  sample('react','React Server Component Boundaries','Keep browser interactivity at narrow client boundaries and move data work to server components.',['frontend','react'],'Engineering','live',score({frontend:1,backend:.4}),12),
  sample('design','Interface Density Principles','Density should reflect task frequency. Use hierarchy, not decoration, to guide attention.',['design','frontend'],'Design','static',score({frontend:.85}),11),
  sample('mqtt','MQTT Telemetry Reliability','Use retained state carefully, define reconnect behavior, and monitor message age.',['iot','network'],'Field Systems','live',score({iot:1,network:.75,backend:.35}),10),
  sample('plc','PLC Alarm Rationalization','Every alarm needs a clear operator action, priority, and measurable consequence.',['plc','automation'],'Field Systems','live',score({iot:.35,instrumentationAutomation:1}),9),
  sample('network','Network Segmentation Notes','Separate management, workload, and device planes. Document every trust boundary.',['network','security'],'Infrastructure','static',score({network:1,devops:.45,iot:.35}),8),
  sample('feature-store','Feature Store Decision','Adopt only when online/offline feature consistency is more costly than the platform itself.',['ml','architecture'],'AI Lab','live',score({mlEngineer:1,aiEngineer:.45,backend:.55}),7),
  sample('observability','Observability Signal Map','Map user journeys to service-level indicators before adding dashboards.',['observability','devops'],'Infrastructure','live',score({devops:.9,backend:.55,instrumentationAutomation:.35}),6),
  sample('automation','Automation Safety Checklist','Prefer reversible actions, explicit limits, dry runs, and auditable state transitions.',['automation','safety'],'Field Systems','static',score({instrumentationAutomation:1,devops:.4,iot:.25}),5),
  sample('learning','Weekly Learning Review','What surprised me? What changed my model? Which idea should become an experiment?',['reflection','learning'],'Personal','live',score({}),4),
  sample('book','Designing Data-Intensive Applications','Reading notes about storage engines, replication, partitioning, and transactions. See [[Distributed Systems Notes]].',['book','backend'],'Library','live',score({backend:1,network:.45}),3),
  sample('ideas','Product Ideas Inbox','A low-friction place for ideas that are not yet projects. Promote only after evidence appears.',['ideas','personal'],'Personal','live',score({frontend:.2,aiEngineer:.15}),2),
  sample('roadmap','Casa Roadmap','Improve capture reliability, semantic retrieval, and daily review. Connect [[RAG Evaluation Playbook]] and [[Weekly Learning Review]].',['casa','roadmap'],'Casa','live',score({frontend:.45,backend:.45,aiEngineer:.8}),1),
]

export const seedTemplates: CaptureTemplate[] = [
  { id: 'atomic', name: 'Atomic Notes', promptText: 'Split by durable idea. Keep each note understandable without the source.', isDefault: true },
  { id: 'meeting', name: 'Meeting Debrief', promptText: 'Separate decisions, open questions, owners, and next actions.', isDefault: false },
]

const dbPromise = typeof window === 'undefined' ? null : openDB('casa-second-brain', 2, { upgrade(db) { if (!db.objectStoreNames.contains('notes')) db.createObjectStore('notes', { keyPath: 'id' }); if (!db.objectStoreNames.contains('templates')) db.createObjectStore('templates', { keyPath: 'id' }) } })
const normalize = (raw: Record<string, unknown>): Note => { const content = String(raw.content ?? ''); return { id: String(raw.id ?? crypto.randomUUID()), title: String(raw.title ?? 'Untitled'), content, tags: Array.isArray(raw.tags) ? raw.tags as string[] : [], category: String(raw.category ?? raw.folder ?? 'Inbox'), noteType: raw.noteType === 'static' ? 'static' : 'live', createdAt: Number(raw.createdAt ?? now), updatedAt: Number(raw.updatedAt ?? now), fieldScores: { ...emptyFields, ...((raw.fieldScores ?? raw.fields ?? {}) as Partial<FieldScores>) }, links: Array.isArray(raw.links) ? raw.links as string[] : extractWikiLinks(content), aiMeta: (raw.aiMeta as Note['aiMeta']) ?? {} } }

export async function loadNotes() { const db = await dbPromise!; const rows = await db.getAll('notes'); if (!rows.length) { await replaceSampleData(); return seedNotes } const notes = rows.map(normalize); await Promise.all(notes.map((note) => db.put('notes', note))); return notes }
export async function saveNote(note: Note) { const db = await dbPromise!; await db.put('notes', { ...note, links: extractWikiLinks(note.content) }) }
export async function deleteNote(id: string) { const db = await dbPromise!; await db.delete('notes', id) }
export async function loadTemplates() { const db = await dbPromise!; const rows = await db.getAll('templates'); if (!rows.length) { await Promise.all(seedTemplates.map((item) => db.put('templates', item))); return seedTemplates } return rows.map((row) => ({ id: row.id, name: row.name, promptText: row.promptText ?? row.prompt ?? '', isDefault: Boolean(row.isDefault) })) as CaptureTemplate[] }
export async function saveTemplate(template: CaptureTemplate) { const db = await dbPromise!; if (template.isDefault) { const rows = await db.getAll('templates'); await Promise.all(rows.map((row) => db.put('templates', { ...row, isDefault: false }))) } await db.put('templates', template) }
export async function deleteTemplate(id: string) { const db = await dbPromise!; await db.delete('templates', id) }
export async function replaceSampleData() { const db = await dbPromise!; const tx = db.transaction(['notes','templates'], 'readwrite'); await tx.objectStore('notes').clear(); await tx.objectStore('templates').clear(); await Promise.all(seedNotes.map((note) => tx.objectStore('notes').put(note))); await Promise.all(seedTemplates.map((template) => tx.objectStore('templates').put(template))); await tx.done }
