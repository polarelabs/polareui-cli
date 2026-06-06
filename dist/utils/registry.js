import fetch from "node-fetch";
const REGISTRY_BASE_URL = "https://raw.githubusercontent.com/polarelabs/polare-ui/main/public/r";
export async function fetchRegistryItem(name) {
    try {
        const url = `${REGISTRY_BASE_URL}/${name}.json`;
        const res = await fetch(url);
        if (!res.ok) {
            return null;
        }
        const data = (await res.json());
        return data;
    }
    catch {
        return null;
    }
}
export async function fetchRegistryIndex() {
    try {
        const url = `${REGISTRY_BASE_URL}/registry.json`;
        const res = await fetch(url);
        if (!res.ok) {
            return [];
        }
        const data = (await res.json());
        return data.items ?? [];
    }
    catch {
        return [];
    }
}
