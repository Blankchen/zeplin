import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { forkJoin, of, Observable } from 'rxjs';
import { ScreenVersionSummary } from 'src/core/domain/interfaces/screen-version';
import { TextExtractorModel } from 'src/core/domain/models/text-extractor.model';
import { ApiService } from 'src/core/infrastructure/services/api.service';
import { ApplicationService } from '../interfaces/application-service';
import { AssetsEntity, ScreenDetail } from 'src/core/domain/interfaces/screen-detail';

declare var Diff: {
  diffLines(oldStr: string, newStr: string): DiffItem[];
  diffJson(oldObj: object, newObj: object): DiffItem[];
};

export interface DiffItem {
  removed?: boolean;
  added?: boolean;
  value?: string;
}

interface GetVersionComparisonInput {
  projectId: string;
  screenId: string;
  selectedScreen: ScreenVersionSummary[];
}

export interface GetVersionComparisonOutput {
  text: DiffItem[];
  image: {
    isDiffExist: boolean;
    deleted: AssetsEntity[],
    added: AssetsEntity[],
  };
}

@Injectable({
  providedIn: 'root'
})
export class GetVersionComparisonService implements ApplicationService<GetVersionComparisonInput, GetVersionComparisonOutput>{

  constructor(
    private apiService: ApiService
  ) { }

  execute(input: GetVersionComparisonInput): Observable<GetVersionComparisonOutput> {
    if (!input.projectId || !input.screenId) {
      return of({} as GetVersionComparisonOutput);
    }
    return this.getScreenDetails(input.projectId, input.screenId, input.selectedScreen);
  }

  private getScreenDetails(
    projectId: string, screenId: string, selectedScreen: ScreenVersionSummary[]
  ): Observable<GetVersionComparisonOutput> {
    return forkJoin([
      this.apiService.getScreenDetails(projectId, screenId, selectedScreen[0].id),
      this.apiService.getScreenDetails(projectId, screenId, selectedScreen[1].id)
    ]).pipe(
      map(([data1, data2]) => {
        return {
          text: this.text(data1, data2),
          image: this.image(data1, data2),
        };
      })
    );
  }

  // #### should move to domain model ####
  private text(data1: ScreenDetail, data2: ScreenDetail): DiffItem[] {
    const text1 = TextExtractorModel.screen(data1).text;
    const text2 = TextExtractorModel.screen(data2).text;
    return Diff.diffLines(text1, text2);
  }

  // #### should move to domain model ####
  private image(data1: ScreenDetail, data2: ScreenDetail): GetVersionComparisonOutput['image'] {
    const arr1 = data1.assets || [];
    const arr2 = data2.assets || [];
    const deleted = arr1.filter(x => !arr2.find(y => y.display_name === x.display_name));
    const added = arr2.filter(x => !arr1.find(y => y.display_name === x.display_name));
    const isDiffExist = !!deleted.length && !!added.length;
    return {
      isDiffExist,
      deleted,
      added
    };
  }

}
