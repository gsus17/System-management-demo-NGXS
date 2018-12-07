import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccessTokenRequest } from '../entities/access-token-request.entity';
import { ApiConfigService } from '../api-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(
    private httpClient: HttpClient,
    private apiConfigService: ApiConfigService) { }

  /**
   * Request an OpenId Authentication.
   */
  public login(accessTokenRequest: AccessTokenRequest): Promise<any> {
    console.log(`${AuthApiService.name}::login credentials %o`, accessTokenRequest);

    const url: string = this.apiConfigService.getAuthUrl() + '/auth/accesstoken';

    const httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    };

    // URLSearchParams normalized the params of the form and the pipes dimiss.
    const body = new URLSearchParams();
    // body.set('client_id', 'traslada.operators');
    // body.set('grant_type', 'password');
    body.set('password', accessTokenRequest.password);
    body.set('username', accessTokenRequest.userName);
    body.set('apiKey', accessTokenRequest.apiKey);
    // body.set('scopes', null);

    return this.httpClient.post(url, body.toString(), httpOptions).toPromise();

  }

}
