import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { GetProjectsService } from 'src/core/application/services/get-projects.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projects$ = this.getProjectsService.execute();

  constructor(
    private getProjectsService: GetProjectsService
  ) {
  }

  ngOnInit(): void {
  }

}
