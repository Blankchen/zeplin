import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { ProjectComponent } from './project/project.component';
import { ScreenVersionComponent } from './screen-version/screen-version.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'project/:projectId',
      component: ProjectComponent
    },
    {
      path: 'screen/:projectId/:screenId',
      component: ScreenVersionComponent
    },
    { path: '**', redirectTo: '' }
  ]
}];

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ProjectComponent,
    ScreenVersionComponent,
  ],
  imports: [
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule { }
