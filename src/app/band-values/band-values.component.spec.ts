import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandValuesComponent } from './band-values.component';

describe('BandValuesComponent', () => {
  let component: BandValuesComponent;
  let fixture: ComponentFixture<BandValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandValuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
