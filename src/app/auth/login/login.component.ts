import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { AuthLoginAction } from './store/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * Formulario de autenticación.
   */
  public form: FormGroup;

  @Select(state => state.auth.showProgressLinear) showProgressLinear$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store) { }


  ngOnInit() {
    this.buildForm();
  }

  /**
   * Auth process.
   */
  public login() {
    console.log(`${LoginComponent.name}::login credentials %o`, this.form.value);
    this.store.dispatch(new AuthLoginAction());
  }

  /**
   * Devuelve la referencia del control.
   */
  public getControl(value: string) {
    return this.form.get(value);
  }

  /**
   * Configuración del formulario de login.
   */
  private buildForm() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, [Validators.required]]
    });
  }
}
