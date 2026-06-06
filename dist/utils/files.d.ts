export declare function writeComponentFile(targetPath: string, content: string): Promise<void>;
export declare function fileExists(targetPath: string): Promise<boolean>;
export declare function readJsonFile<T>(filePath: string): Promise<T | null>;
export declare function writeJsonFile(filePath: string, data: unknown): Promise<void>;
