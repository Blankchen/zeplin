import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScreenDetail } from 'src/core/domain/interfaces/screen-detail';
import { expand, reduce } from 'rxjs/operators';
import { Organization } from 'src/core/domain/interfaces/organization';
import { Project } from 'src/core/domain/interfaces/project';
import { ProjectScreen } from 'src/core/domain/interfaces/project-screen';
import { ScreenVersionSummary } from 'src/core/domain/interfaces/screen-version';
import { Pagination } from 'src/core/domain/models/pagination.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getOrganizations(): Observable<Organization[]> {
    const url = `https://api.zeplin.dev/v1/organizations`;
    return this.http.get<Organization[]>(url);
  }

  getProjects(organizationId: string): Observable<Project[]> {
    const url = `https://api.zeplin.dev/v1/organizations/${organizationId}/projects`;
    const pagination = new Pagination({ limit: 100 });
    return this.getAllPagination<Project>(url, pagination);
  }

  getProjectScreens(projectId: string): Observable<ProjectScreen[]> {
    const url = `https://api.zeplin.dev/v1/projects/${projectId}/screens`;
    const pagination = new Pagination({ limit: 100 });
    return this.getAllPagination<ProjectScreen>(url, pagination);
  }

  getScreenVersions(projectId: string, screenId: string): Observable<ScreenVersionSummary[]> {
    const url = `https://api.zeplin.dev/v1/projects/${projectId}/screens/${screenId}/versions`;
    const pagination = new Pagination();
    return this.getAllPagination<ScreenVersionSummary>(url, pagination);
  }

  getScreenDetails(projectId: string, screenId: string, versionId: string): Observable<ScreenDetail> {
    const url = `https://api.zeplin.dev/v1/projects/${projectId}/screens/${screenId}/versions/${versionId}`;
    const pagination = new Pagination({ limit: 100 });
    const params = new HttpParams({
      fromObject: {
        ...pagination.forHttpParams
      }
    });
    return this.http.get<ScreenDetail>(url, { params });
  }

  private getAllPagination<T>(url: string, pagination: Pagination): Observable<T[]> {
    const api = (page: Pagination) => {
      const params = new HttpParams({
        fromObject: {
          ...page.forHttpParams
        }
      });
      return this.http.get<T[]>(url, { params });
    };
    return api(pagination).pipe(
      expand(x => {
        if (x.length === pagination.limit) {
          pagination.offset += pagination.limit;
          return api(pagination);
        }
        return EMPTY;
      }),
      reduce((acc, res) => acc.concat(res), [] as T[])
    );
  }


}
