import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { FehlerbaumEditor } from './FehlerbaumEditor'
import { FaultTree } from './model'

function addViaSidebar(name: string) {
  return userEvent.dblClick(screen.getByText(name))
}

const originalElementFromPoint = document.elementFromPoint

describe('FehlerbaumEditor', () => {
  afterEach(() => {
    document.elementFromPoint = originalElementFromPoint
  })

  it('bietet die drei Verknüpfungselemente in der Seitenleiste an', () => {
    render(<FehlerbaumEditor tree={new FaultTree()} />)
    const sidebar = screen.getByRole('complementary', { name: 'Verknüpfungselemente' })
    for (const name of ['Standardeingang', 'ODER-Verknüpfung', 'UND-Verknüpfung']) {
      expect(within(sidebar).getByText(name)).toBeInTheDocument()
    }
  })

  it('fügt per Doppelklick Elemente ins Feld ein und zeigt ihre Namen', async () => {
    const tree = new FaultTree()
    render(<FehlerbaumEditor tree={tree} />)
    await addViaSidebar('Standardeingang')
    await addViaSidebar('UND-Verknüpfung')
    expect(tree.all().map((element) => element.kind)).toEqual(['standardeingang', 'und'])
    expect(screen.getByText('Eingang 1')).toBeInTheDocument()
    expect(screen.getByText('UND 1')).toBeInTheDocument()
  })

  it('zeigt einen Hinweis, solange das Feld leer ist', async () => {
    render(<FehlerbaumEditor tree={new FaultTree()} />)
    expect(screen.getByText(/in dieses Feld ziehen/)).toBeInTheDocument()
    await addViaSidebar('Standardeingang')
    expect(screen.queryByText(/in dieses Feld ziehen/)).not.toBeInTheDocument()
  })

  it('stellt Verbindungen des Baums als Linien dar', () => {
    const tree = new FaultTree()
    const oder = tree.create('oder', { x: 100, y: 20 })
    const eingang = tree.create('standardeingang', { x: 100, y: 200 })
    tree.connect(eingang.id, oder.id)
    const { container } = render(<FehlerbaumEditor tree={tree} />)
    expect(container.querySelectorAll('path.ft-connection')).toHaveLength(1)
  })

  it('verbindet per Mausziehen von einem Ausgang zu einem Eingang', () => {
    const tree = new FaultTree()
    const oder = tree.create('oder', { x: 100, y: 20 })
    const eingang = tree.create('standardeingang', { x: 100, y: 200 })
    const { container } = render(<FehlerbaumEditor tree={tree} />)
    const out = container.querySelector(`[data-stub="out"][data-element-id="${eingang.id}"]`)!
    const input = container.querySelector(`[data-stub="in"][data-element-id="${oder.id}"]`)!
    // jsdom hat kein Layout: elementFromPoint liefert den Ziel-Stub.
    document.elementFromPoint = () => input
    fireEvent.pointerDown(out, { button: 0, clientX: 10, clientY: 10 })
    fireEvent.pointerUp(window, { clientX: 20, clientY: 20 })
    expect(oder.nodes).toEqual([eingang])
  })

  it('meldet eine abgelehnte Verbindung statt sie anzulegen', () => {
    const tree = new FaultTree()
    const oder = tree.create('oder', { x: 100, y: 20 })
    const und = tree.create('und', { x: 100, y: 200 })
    tree.connect(und.id, oder.id)
    const { container } = render(<FehlerbaumEditor tree={tree} />)
    const out = container.querySelector(`[data-stub="out"][data-element-id="${oder.id}"]`)!
    const input = container.querySelector(`[data-stub="in"][data-element-id="${und.id}"]`)!
    document.elementFromPoint = () => input
    fireEvent.pointerDown(out, { button: 0, clientX: 10, clientY: 10 })
    fireEvent.pointerUp(window, { clientX: 20, clientY: 20 })
    expect(screen.getByRole('status')).toHaveTextContent('Zyklus')
    expect(und.nodes).toEqual([])
  })

  it('löscht das gewählte Element mit Entf samt seinen Verbindungen', async () => {
    const tree = new FaultTree()
    const oder = tree.create('oder', { x: 100, y: 20 })
    const eingang = tree.create('standardeingang', { x: 100, y: 200 })
    tree.connect(eingang.id, oder.id)
    render(<FehlerbaumEditor tree={tree} />)
    await userEvent.click(screen.getByText('Eingang 1'))
    fireEvent.pointerDown(screen.getByText('Eingang 1').closest('g')!, { button: 0 })
    await userEvent.keyboard('{Delete}')
    expect(tree.get(eingang.id)).toBeUndefined()
    expect(oder.nodes).toEqual([])
  })

  it('benennt ein Element per Doppelklick um', async () => {
    const tree = new FaultTree()
    tree.create('standardeingang', { x: 50, y: 50 })
    render(<FehlerbaumEditor tree={tree} />)
    await userEvent.dblClick(screen.getByText('Eingang 1').closest('g')!)
    const input = screen.getByRole('textbox')
    await userEvent.clear(input)
    await userEvent.type(input, 'Sensor A{Enter}')
    expect(screen.getByText('Sensor A')).toBeInTheDocument()
    expect(tree.all()[0].label).toBe('Sensor A')
  })
})
