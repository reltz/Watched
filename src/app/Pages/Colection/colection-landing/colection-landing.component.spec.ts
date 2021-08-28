import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ColectionLandingComponent } from './colection-landing.component';

describe('ColectionLandingComponent', () => {
  let component: ColectionLandingComponent;
  let fixture: ComponentFixture<ColectionLandingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ColectionLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColectionLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
