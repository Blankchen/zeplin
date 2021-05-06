import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Organization } from 'src/core/domain/interfaces/organization';
import { ApiService } from 'src/core/infrastructure/services/api.service';
import { StorageService } from 'src/core/infrastructure/services/storage.service';
import { ApplicationService } from '../interfaces/application-service';

@Injectable({
  providedIn: 'root'
})
export class GetOrganizationsService implements ApplicationService<void, Organization> {

  constructor(
    private apiService: ApiService,
    private storageService: StorageService
  ) { }

  execute(): Observable<Organization> {
    return this.getOrganizations();
  }

  private getOrganizations(): Observable<Organization> {
    const organization = this.storageService.get<Organization>('Organization');
    if (organization) {
      return of(organization);
    }
    return this.apiService.getOrganizations().pipe(
      map(data => this.setFirstOrgAsDefault(data))
    );
  }

  private setFirstOrgAsDefault(organizations: Organization[]): Organization {
    let result = {} as Organization;
    if (organizations && organizations.length >= 1) {
      result = organizations[0];
      this.storageService.set<Organization>('Organization', result);
    }
    return result;
  }
}
