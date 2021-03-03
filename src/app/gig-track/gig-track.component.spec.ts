import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GigTrackComponent } from './gig-track.component';

describe('GigTrackComponent', () => {
  let component: GigTrackComponent;
  let fixture: ComponentFixture<GigTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GigTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GigTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
