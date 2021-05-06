import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ScreenVersionSummary } from 'src/core/domain/interfaces/screen-version';
import { ApiService } from 'src/core/infrastructure/services/api.service';
import { ApplicationService } from '../interfaces/application-service';

interface GetScreenVersionsInput {
  projectId: string;
  screenId: string;
}

@Injectable({
  providedIn: 'root'
})
export class GetScreenVersionsService implements ApplicationService<GetScreenVersionsInput, ScreenVersionSummary[]> {

  constructor(
    private apiService: ApiService,
  ) { }

  execute(input: GetScreenVersionsInput): Observable<ScreenVersionSummary[]> {
    if (!input.projectId || !input.screenId) {
      return of([] as ScreenVersionSummary[]);
    }
    return this.getScreenVersions(input.projectId, input.screenId);
  }

  private getScreenVersions(projectId: string, screenId: string): Observable<ScreenVersionSummary[]> {
    return this.apiService.getScreenVersions(projectId, screenId).pipe(
      map(data => data.sort((a, b) => b.created - a.created))
    );
  }
}
