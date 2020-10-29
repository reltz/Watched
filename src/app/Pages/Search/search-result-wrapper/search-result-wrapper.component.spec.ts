import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultWrapperComponent } from './search-result-wrapper.component';

describe('SearchResultWrapperComponent', () => {
  let component: SearchResultWrapperComponent;
  let fixture: ComponentFixture<SearchResultWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
