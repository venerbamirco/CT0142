import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificapasswordComponent } from './modificapassword.component';

describe('ModificapasswordComponent', () => {
  let component: ModificapasswordComponent;
  let fixture: ComponentFixture<ModificapasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificapasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificapasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
