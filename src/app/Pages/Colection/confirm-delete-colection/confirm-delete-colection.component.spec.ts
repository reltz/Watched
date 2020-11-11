import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteColectionComponent } from './confirm-delete-colection.component';

describe('ConfirmDeleteColectionComponent', () => {
  let component: ConfirmDeleteColectionComponent;
  let fixture: ComponentFixture<ConfirmDeleteColectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteColectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteColectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
