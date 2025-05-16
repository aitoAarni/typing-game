export interface StorageAdapter {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
}

export class BrowserStorage implements StorageAdapter {
    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
}