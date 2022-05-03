import { Cache } from 'swr';

const { localStorage } = window;

export class LSMap<Data> implements Cache<Data> {
  private static readonly LSEntry = '@swr$cache';

  public get(key: string): Data | undefined {
    const entry = `${LSMap.LSEntry}@${key}`;
    const data = localStorage.getItem(`${LSMap.LSEntry}@${key}`);

    try {
      return JSON.parse(data);
    } catch (err) {
      localStorage.removeItem(entry);
      return undefined;
    }
  }

  public set(key: string, value: Data): void {
    const entry = `${LSMap.LSEntry}@${key}`;
    const data = JSON.stringify(value);

    localStorage.setItem(entry, data);
  }

  public delete(key: string): void {
    localStorage.removeItem(`${LSMap.LSEntry}@${key}`);
  }
}
