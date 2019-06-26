import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCountryComponent } from './formulario.component';

describe('FormularioComponent', () => {
  let component: FormularioCountryComponent;
  let fixture: ComponentFixture<FormularioCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
