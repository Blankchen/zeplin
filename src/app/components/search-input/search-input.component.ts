import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnChanges {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() searchBy = '';
  @Input() source = [] as any[];

  myControl = new FormControl();
  data$: Observable<any[]> = of();

  constructor() { }

  ngOnChanges(): void {
    this.data$ = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.source.filter(x => {
      const searchField = x[this.searchBy];
      if (!searchField) { return true; }
      return searchField.toLowerCase().includes(filterValue);
    });
  }

}
