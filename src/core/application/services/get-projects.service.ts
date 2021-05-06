import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Organization } from 'src/core/domain/interfaces/organization';
import { Project } from 'src/core/domain/interfaces/project';
import { ApiService } from 'src/core/infrastructure/services/api.service';
import { StorageService } from 'src/core/infrastructure/services/storage.service';
import { ApplicationService } from '../interfaces/application-service';

@Injectable({
  providedIn: 'root'
})
export class GetProjectsService implements ApplicationService<void, Project[]> {

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
  ) { }

  execute(): Observable<Project[]> {
    return this.getProjects();
  }

  private getProjects(): Observable<Project[]> {
    const organization = this.storageService.get<Organization>('Organization');
    if (!organization) {
      return of([] as Project[]);
    }
    return this.apiService.getProjects(organization.id);
  }
}
