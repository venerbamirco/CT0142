import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagestudenteComponent } from './homepagestudente.component';

describe('HomepagestudenteComponent', () => {
  let component: HomepagestudenteComponent;
  let fixture: ComponentFixture<HomepagestudenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepagestudenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepagestudenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
