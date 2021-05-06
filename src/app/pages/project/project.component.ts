import { Component, OnInit } from '@angular/core';
import { GetProjectScreensOutput, GetProjectScreensService } from 'src/core/application/services/get-project-screens.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProjectScreen } from 'src/core/domain/interfaces/project-screen';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectId = '';
  projectScreenData$: Observable<GetProjectScreensOutput> = of();
  selectedTag = '';

  constructor(
    private route: ActivatedRoute,
    private getProjectScreensService: GetProjectScreensService
  ) {
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId') || '';
    this.projectId = projectId;
    this.projectScreenData$ = this.getProjectScreensService.execute({ projectId });
  }

  selectTag(tag: string): void {
    if (this.selectedTag === tag) {
      this.selectedTag = '';
    } else {
      this.selectedTag = tag;
    }
  }

  isHideScreen(screen: ProjectScreen): boolean {
    if (!this.selectedTag || !screen.tags) {
      return false;
    }
    return !screen.tags.includes(this.selectedTag);
  }

}
