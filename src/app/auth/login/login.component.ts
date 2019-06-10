import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
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
   * User credentials.
   */
  public credentials: Credentials;

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

  // Convenience getter for easy access to form fields.
  get form() { return this.authForm.controls; }

  constructor(
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.credentials = {
      user: '',
      password: ''
    };
  }

  /**
   * Auth process.
   */
  public login() {
    console.log(`${LoginComponent.name}::login credentials %o`, this.credentials);
    this.redirect();
    // this.progressLinear = true;
    // this.loginService.login(this.credentials)
    //   .then(() => {
    //     console.log(`${LoginComponent.name}::login (then)`);
    //     this.redirect();
    //   })
    //   .catch((error) => {
    //     console.log(`${LoginComponent.name}::login (catch) %o`, error);
    //   })
    //   .finally(() => {
    //     this.progressLinear = false;
    //   });
  }

  /**
   * Redirect to main view.
   */
  public redirect() {
    this.router.navigate(['master-page/personas/listado']);
  }

}
