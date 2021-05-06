import { Injectable } from '@angular/core';

type LocalStorageKey = 'Organization';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set<Type>(key: LocalStorageKey, object: Type): void {
    const value = JSON.stringify(object);
    localStorage.setItem(key, value);
  }

  remove(key: LocalStorageKey): void {
    localStorage.removeItem(key);

  }

  get<Type>(key: LocalStorageKey): Type | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  clear(): void {
    localStorage.clear();

  }
}
