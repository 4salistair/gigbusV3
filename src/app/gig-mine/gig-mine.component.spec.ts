import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GigMineComponent } from './gig-mine.component';

describe('GigMineComponent', () => {
  let component: GigMineComponent;
  let fixture: ComponentFixture<GigMineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GigMineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GigMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
