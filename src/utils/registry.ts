import fetch from "node-fetch"

const REGISTRY_BASE_URL ="https://raw.githubusercontent.com/TheWebPrime/polare-ui/main/public/r"


export interface RegistryItem {
  name: string
  type: string
  title: string
  description: string
  files: {
    path: string
    type: string
    target: string
    content?: string
  }[]
  dependencies?: string[]
}

export async function fetchRegistryItem(
  name: string
): Promise<RegistryItem | null> {
  try {
    const url = `${REGISTRY_BASE_URL}/${name}.json`
    const res = await fetch(url)

    if (!res.ok) {
      return null
    }

    const data = (await res.json()) as RegistryItem
    return data
  } catch {
    return null
  }
}

export async function fetchRegistryIndex(): Promise<RegistryItem[]> {
  try {
    const url = `${REGISTRY_BASE_URL}/registry.json`
    const res = await fetch(url)

    if (!res.ok) {
      return []
    }

    const data = (await res.json()) as { items: RegistryItem[] }
    return data.items ?? []
  } catch {
    return []
  }
}