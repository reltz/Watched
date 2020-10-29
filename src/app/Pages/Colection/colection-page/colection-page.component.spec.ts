import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColectionPageComponent } from './colection-page.component';

describe('ColectionPageComponent', () => {
  let component: ColectionPageComponent;
  let fixture: ComponentFixture<ColectionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColectionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
