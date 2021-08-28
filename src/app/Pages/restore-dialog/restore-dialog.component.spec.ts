import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RestoreDialogComponent } from './restore-dialog.component';

describe('RestoreDialogComponent', () => {
  let component: RestoreDialogComponent;
  let fixture: ComponentFixture<RestoreDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RestoreDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
