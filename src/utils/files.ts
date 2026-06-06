import fs from "fs-extra"
import path from "path"

export async function writeComponentFile(
  targetPath: string,
  content: string
): Promise<void> {
  const fullPath = path.join(process.cwd(), targetPath)
  await fs.ensureDir(path.dirname(fullPath))
  await fs.writeFile(fullPath, content, "utf-8")
}

export async function fileExists(targetPath: string): Promise<boolean> {
  const fullPath = path.join(process.cwd(), targetPath)
  return fs.pathExists(fullPath)
}

export async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const fullPath = path.join(process.cwd(), filePath)
    const content = await fs.readFile(fullPath, "utf-8")
    return JSON.parse(content) as T
  } catch {
    return null
  }
}

export async function writeJsonFile(
  filePath: string,
  data: unknown
): Promise<void> {
  const fullPath = path.join(process.cwd(), filePath)
  await fs.ensureDir(path.dirname(fullPath))
  await fs.writeFile(fullPath, JSON.stringify(data, null, 2), "utf-8")
}