import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Organization } from 'src/core/domain/interfaces/organization';

type LocalStorageKey = 'Organization';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  organization = new BehaviorSubject<Organization>({} as Organization);

  constructor() { }

  set<Type>(key: LocalStorageKey, object: Type): void {
    this.subjectHandler(key, object);
    const value = JSON.stringify(object);
    localStorage.setItem(key, value);
  }

  remove(key: LocalStorageKey): void {
    localStorage.removeItem(key);
  }

  get<Type>(key: LocalStorageKey): Type | null {
    const value = localStorage.getItem(key);
    const result = value ? JSON.parse(value) : null;
    this.subjectHandler(key, result);
    return result;
  }

  clear(): void {
    localStorage.clear();
  }

  private subjectHandler(key: LocalStorageKey, value: any): void {
    if (key === 'Organization' && !!value) {
      this.organization.next(value);
    }
  }
}
