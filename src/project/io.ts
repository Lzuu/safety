import type { Project } from './types'

export function exportProjectToFile(project: Project): void {
  const blob = new Blob([JSON.stringify(project, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${project.name || 'projekt'}.safety.json`
  link.click()
  URL.revokeObjectURL(url)
}

export function importProjectFromFile(file: File): Promise<Project> {
  return file.text().then((text) => {
    const parsed = JSON.parse(text)
    if (parsed.version !== 1) {
      throw new Error(`Unbekannte Projektdatei-Version: ${parsed.version}`)
    }
    return parsed as Project
  })
}
