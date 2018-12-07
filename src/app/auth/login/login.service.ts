import { Injectable } from '@angular/core';
import { Credentials } from './interfaces/credentials';
import { AccessTokenRequest } from 'src/api/entities/access-token-request.entity';
import { AuthApiService } from 'src/api/auth/auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private authApiService: AuthApiService) { }

  /**
   * Auth login process.
   */
  public login(credentials: Credentials): Promise<any> {
    console.log(`${LoginService.name}::login`);

    const accessTokenRequest = this.mapLoginModelToAccessTokenRequest(credentials);

    const promise: Promise<void> = new Promise((resolve, reject) => {
      this.authApiService.login(accessTokenRequest)
        .then((data: any) => {
          console.log(`${LoginService.name}::data %`, data);
          // this.token = data.access_token;
          // localStorage.setItem('authToken', this.token);
          resolve();
        })
        .catch((err) => {
          console.log(`${LoginService.name}::error %`, err);
          reject(err);
        });
    });

    return promise;
  }


  /**
   * Mapea un credentials a un AccessTokenRequest.
   */
  private mapLoginModelToAccessTokenRequest(credentials: Credentials): AccessTokenRequest {
    console.log(`${LoginService.name}::mapLoginModelToLoginRequest`);

    const accessTokenRequest: AccessTokenRequest = {
      userName: credentials.user,
      password: credentials.password,
      apiKey: null
    };

    return accessTokenRequest;
  }
}
