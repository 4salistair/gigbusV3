import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GigShareComponent } from './gig-share.component';

describe('GigShareComponent', () => {
  let component: GigShareComponent;
  let fixture: ComponentFixture<GigShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GigShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GigShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
