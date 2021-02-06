import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GigPriceComponent } from './gig-price.component';

describe('GigPriceComponent', () => {
  let component: GigPriceComponent;
  let fixture: ComponentFixture<GigPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GigPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GigPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
