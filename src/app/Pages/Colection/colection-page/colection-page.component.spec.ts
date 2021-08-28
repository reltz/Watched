import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ColectionPageComponent } from './colection-page.component';

describe('ColectionPageComponent', () => {
  let component: ColectionPageComponent;
  let fixture: ComponentFixture<ColectionPageComponent>;

  beforeEach(waitForAsync(() => {
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
