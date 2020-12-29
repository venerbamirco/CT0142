import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagemoderatoreComponent } from './homepagemoderatore.component';

describe('HomepagemoderatoreComponent', () => {
  let component: HomepagemoderatoreComponent;
  let fixture: ComponentFixture<HomepagemoderatoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepagemoderatoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepagemoderatoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
