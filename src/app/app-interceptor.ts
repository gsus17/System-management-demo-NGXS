import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  private defaultApplicationHeaders = {
    'content-Type': 'application/json'
  };

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`${AppInterceptor.name}::intercept request %o`, request);

    // Get new headers.
    const newHeaders = this.buildRequestHeaders();

    // Clone and return the new headers.
    const newRequest = request.clone({ headers: newHeaders });

    return next.handle(newRequest);
  }

  /**
   * Build a new header.
   */
  private buildRequestHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');

    const headers = this.defaultApplicationHeaders;

    // set API-Token if available
    if (authToken !== null) {
      const authHeaderTpl = `Bearer ${authToken}`;
      headers['Authorization'] = authHeaderTpl;
    }

    return new HttpHeaders(headers);
  }
}

