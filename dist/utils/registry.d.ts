export interface RegistryItem {
    name: string;
    type: string;
    title: string;
    description: string;
    files: {
        path: string;
        type: string;
        target: string;
        content?: string;
    }[];
    dependencies?: string[];
}
export declare function fetchRegistryItem(name: string): Promise<RegistryItem | null>;
export declare function fetchRegistryIndex(): Promise<RegistryItem[]>;
