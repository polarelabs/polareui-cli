import fs from "fs-extra";
import path from "path";
export async function writeComponentFile(targetPath, content) {
    const fullPath = path.join(process.cwd(), targetPath);
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, content, "utf-8");
}
export async function fileExists(targetPath) {
    const fullPath = path.join(process.cwd(), targetPath);
    return fs.pathExists(fullPath);
}
export async function readJsonFile(filePath) {
    try {
        const fullPath = path.join(process.cwd(), filePath);
        const content = await fs.readFile(fullPath, "utf-8");
        return JSON.parse(content);
    }
    catch {
        return null;
    }
}
export async function writeJsonFile(filePath, data) {
    const fullPath = path.join(process.cwd(), filePath);
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, JSON.stringify(data, null, 2), "utf-8");
}
