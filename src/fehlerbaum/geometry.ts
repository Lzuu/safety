import type { ElementKind, Point } from './model'

export const ELEMENT_KINDS: ElementKind[] = ['standardeingang', 'oder', 'und']

export const KIND_NAMES: Record<ElementKind, string> = {
  standardeingang: 'Standardeingang',
  oder: 'ODER-Verknüpfung',
  und: 'UND-Verknüpfung',
}

export const GATE_SIZE = { w: 72, h: 64 }
export const EVENT_SIZE = { w: 56, h: 56 }

export function sizeOf(kind: ElementKind): { w: number; h: number } {
  return kind === 'standardeingang' ? EVENT_SIZE : GATE_SIZE
}

/** Ausgang: oben in der Mitte, führt zum übergeordneten Element. */
export function outputAnchor(kind: ElementKind, position: Point): Point {
  return { x: position.x + sizeOf(kind).w / 2, y: position.y }
}

/** Eingang (nur Verknüpfungen): unten in der Mitte. */
export function inputAnchor(kind: ElementKind, position: Point): Point {
  const { w, h } = sizeOf(kind)
  return { x: position.x + w / 2, y: position.y + h }
}

/** Kurve von einem Ausgang (Kind) zu einem Eingang (Eltern). */
export function connectionPath(from: Point, to: Point): string {
  const midY = (from.y + to.y) / 2
  return `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`
}
