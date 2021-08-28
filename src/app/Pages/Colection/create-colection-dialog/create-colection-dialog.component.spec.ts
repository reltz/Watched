import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateColectionDialogComponent } from './create-colection-dialog.component';

describe('CreateColectionDialogComponent', () => {
  let component: CreateColectionDialogComponent;
  let fixture: ComponentFixture<CreateColectionDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateColectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateColectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
