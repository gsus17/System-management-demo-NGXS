import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppHelperService {

  constructor() { }

  /**
   * Devuelve true si el token es válido y no está expirado. False de lo contrario.
   * @param token Access token.
   * @returns True si el token es válido y no está expirado. False de lo contrario.
   */
  public isValidToken(token: string): boolean {
    // TODO: Validar expiración de token.
    return typeof token === 'string' && token.length > 0;
  }
}
