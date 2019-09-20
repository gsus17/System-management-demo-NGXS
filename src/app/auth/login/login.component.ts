import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Credentials } from './interfaces/credentials';

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

  constructor(private router: Router) { }

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
    this.router.navigate(['master-page/personas/listado']);
  }
}
