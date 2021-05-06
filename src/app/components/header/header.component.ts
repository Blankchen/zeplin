import { Component, OnInit } from '@angular/core';
import { GetOrganizationsService } from 'src/core/application/services/get-organizations.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  organization$ = this.getOrganizationsService.execute();

  constructor(
    private getOrganizationsService: GetOrganizationsService
  ) { }

  ngOnInit(): void {
  }

}
