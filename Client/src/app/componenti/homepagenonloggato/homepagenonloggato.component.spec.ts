import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagenonloggatoComponent } from './homepagenonloggato.component';

describe('HomepagenonloggatoComponent', () => {
  let component: HomepagenonloggatoComponent;
  let fixture: ComponentFixture<HomepagenonloggatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepagenonloggatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepagenonloggatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
