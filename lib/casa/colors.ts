import type { FieldScores } from './types'

const hues: Record<keyof FieldScores, number> = { backend: 221, frontend: 188, aiEngineer: 258, mlEngineer: 330, devops: 24, iot: 142, network: 47, instrumentationAutomation: 0 }

export function blendFieldColor(scores: FieldScores) {
  const entries = Object.entries(scores).filter(([, value]) => value > 0) as [keyof FieldScores, number][]
  const total = entries.reduce((sum, [, value]) => sum + value, 0)
  if (!total) return '#9CA3AF'
  const x = entries.reduce((sum, [key, value]) => sum + Math.cos(hues[key] * Math.PI / 180) * value, 0)
  const y = entries.reduce((sum, [key, value]) => sum + Math.sin(hues[key] * Math.PI / 180) * value, 0)
  const hue = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360
  const saturation = Math.min(78, 48 + total / entries.length * 30)
  return `hsl(${Math.round(hue)} ${Math.round(saturation)}% 56%)`
}
