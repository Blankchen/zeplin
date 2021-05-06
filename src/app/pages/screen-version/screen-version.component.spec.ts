import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenVersionComponent } from './screen-version.component';

describe('ScreenVersionComponent', () => {
  let component: ScreenVersionComponent;
  let fixture: ComponentFixture<ScreenVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
