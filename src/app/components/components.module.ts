import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { VersionDialogComponent } from './version-dialog/version-dialog.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { MaterialModule } from './material-module';

const components = [
  HeaderComponent,
  VersionDialogComponent,
  SearchInputComponent,
];

const baseModule = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...baseModule,
    ...MaterialModule,
  ],
  exports: [
    ...components,
    ...baseModule,
    ...MaterialModule,
  ]
})
export class ComponentsModule { }
