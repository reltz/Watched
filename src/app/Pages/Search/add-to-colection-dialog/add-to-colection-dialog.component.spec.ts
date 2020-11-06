import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToColectionDialogComponent } from './add-to-colection-dialog.component';

describe('AddToColectionDialogComponent', () => {
  let component: AddToColectionDialogComponent;
  let fixture: ComponentFixture<AddToColectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToColectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToColectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
