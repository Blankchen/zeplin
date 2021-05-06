import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScreenVersionSummary } from 'src/core/domain/interfaces/screen-version';
import { MatDialog } from '@angular/material/dialog';
import { VersionDialogComponent } from '../../components/version-dialog/version-dialog.component';
import { DatePipe } from '@angular/common';
import { GetScreenVersionsService } from 'src/core/application/services/get-screen-versions.service';
import { GetVersionComparisonOutput, GetVersionComparisonService } from 'src/core/application/services/get-version-comparison.service';
import { Observable, of } from 'rxjs';
import { SelectVersion } from 'src/core/application/models/select-version.model';

@Component({
  selector: 'app-screen-version',
  templateUrl: './screen-version.component.html',
  styleUrls: ['./screen-version.component.scss']
})
export class ScreenVersionComponent implements OnInit {
  screenVersions$: Observable<ScreenVersionSummary[]> = of();
  selectVersion = new SelectVersion();
  projectId = '';
  screenId = '';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private getScreenVersionsService: GetScreenVersionsService,
    private getVersionComparisonService: GetVersionComparisonService,
  ) { }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId') || '';
    this.projectId = projectId;
    const screenId = this.route.snapshot.paramMap.get('screenId') || '';
    this.screenId = screenId;
    this.screenVersions$ = this.getScreenVersionsService.execute({ projectId, screenId });
  }

  getVersionComparison(): void {
    const datePile = (value: number) => new DatePipe('en-US').transform(value * 1000, 'YYYY-MM-dd hh:mm:ss');
    const projectId = this.projectId;
    const screenId = this.screenId;
    const selectedScreen = this.selectVersion.selectedScreen;
    this.isLoading = true;
    this.getVersionComparisonService.execute({ projectId, screenId, selectedScreen }).subscribe(data => {
      this.isLoading = false;
      const title = `${datePile(selectedScreen[0].created)} compare with ${datePile(selectedScreen[1].created)}`;
      this.openDialog(title, data);
    });
  }

  private openDialog(title: string, diffData: GetVersionComparisonOutput): void {
    this.dialog.open(VersionDialogComponent, {
      data: {
        title,
        diffData
      }
    });
  }
}

