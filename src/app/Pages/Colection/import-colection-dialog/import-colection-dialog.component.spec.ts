import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImportColectionDialogComponent } from './import-colection-dialog.component';

describe('ImportColectionDialogComponent', () => {
  let component: ImportColectionDialogComponent;
  let fixture: ComponentFixture<ImportColectionDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportColectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportColectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
