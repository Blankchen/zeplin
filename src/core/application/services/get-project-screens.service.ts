import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProjectScreen } from 'src/core/domain/interfaces/project-screen';
import { ApplicationService } from '../interfaces/application-service';
import { ApiService } from 'src/core/infrastructure/services/api.service';
import { map } from 'rxjs/operators';

interface GetProjectScreensInput {
  projectId: string;
}

export interface GetProjectScreensOutput {
  tags: string[];
  screens: ProjectScreen[];
}

@Injectable({
  providedIn: 'root'
})
export class GetProjectScreensService implements ApplicationService<GetProjectScreensInput, GetProjectScreensOutput> {

  constructor(
    private apiService: ApiService,
  ) { }

  execute(input: GetProjectScreensInput): Observable<GetProjectScreensOutput> {
    if (!input.projectId) {
      return of({
        tags: [],
        screens: [],
      } as GetProjectScreensOutput);
    }
    return this.getProjectScreens(input.projectId);
  }

  private getProjectScreens(projectId: string): Observable<GetProjectScreensOutput> {
    return this.apiService.getProjectScreens(projectId).pipe(
      map(data => {
        const tagSet = new Set();
        data.forEach(x => x.tags?.forEach(y => tagSet.add(y)));
        return {
          tags: Array.from(tagSet),
          screens: data,
        } as GetProjectScreensOutput;
      })
    );
  }
}
