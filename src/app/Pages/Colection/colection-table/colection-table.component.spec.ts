import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ColectionTableComponent } from './colection-table.component';

describe('ColectionTableComponent', () => {
  let component: ColectionTableComponent;
  let fixture: ComponentFixture<ColectionTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ColectionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
