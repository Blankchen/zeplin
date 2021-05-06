import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Organization } from 'src/core/domain/interfaces/organization';
import { Project } from 'src/core/domain/interfaces/project';
import { ApiService } from 'src/core/infrastructure/services/api.service';
import { StorageService } from 'src/core/infrastructure/services/storage.service';
import { ApplicationService } from '../interfaces/application-service';
import { filter, switchMap } from 'rxjs/operators';

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
    return this.storageService.organization.pipe(
      filter(x => !!x.id),
      switchMap(organization => this.apiService.getProjects(organization.id))
    );
  }
}
