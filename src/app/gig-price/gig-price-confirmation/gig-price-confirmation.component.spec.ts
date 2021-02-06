import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GigPriceConfirmationComponent } from './gig-price-confirmation.component';

describe('GigPriceConfirmationComponent', () => {
  let component: GigPriceConfirmationComponent;
  let fixture: ComponentFixture<GigPriceConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GigPriceConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GigPriceConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
