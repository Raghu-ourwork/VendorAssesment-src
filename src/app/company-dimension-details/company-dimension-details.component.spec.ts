import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDimensionDetailsComponent } from './company-dimension-details.component';

describe('DemoComponent', () => {
  let component: CompanyDimensionDetailsComponent;
  let fixture: ComponentFixture<CompanyDimensionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyDimensionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDimensionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
