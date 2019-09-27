import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * Validation Form control.
   */
  public authForm = new FormGroup(
    {
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }
  );

  /**
   * Progress linear to loading process.
   */
  public progressLinear: boolean = false;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  /**
   * Auth process.
   */
  public login() {
    console.log(`${LoginComponent.name}::login credentials %o`, this.authForm.value);
    this.redirect();
  }

  /**
   * Redirect to main view.
   */
  public redirect() {
    this.store.dispatch(new Navigate(['master-page/personas/listado']));
  }
}
