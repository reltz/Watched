import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColectionTableComponent } from './colection-table.component';

describe('ColectionTableComponent', () => {
  let component: ColectionTableComponent;
  let fixture: ComponentFixture<ColectionTableComponent>;

  beforeEach(async(() => {
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
