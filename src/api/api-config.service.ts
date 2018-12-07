import { Injectable } from '@angular/core';

/**
 * Settings de api.
 * @export
 */
@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

    /**
     * Declaración de dependencias.
     * @memberOf ApiConfigService
     */
    public static $inject = ['$log'];

    /**
     * Protocolo por default.
     * @memberOf ApiConfigService
     */
    private protocol: string = 'https://';

    /**
     * Dominio de la url de las API.
     * @memberOf ApiConfigService
     */
    private domain: string = 'zwitcher.com';

    /**
     * Url fake api.
     */
    private apiUrl: string = '10.0.0.1';

    /**
     * Grant type.
     */
    private grantType: string = 'password';

    /**
     * Creates an instance of ApiConfigService.
     * @memberOf ApiConfigService
     */
    constructor() {
        console.log(`${ApiConfigService.name}::ctor`);
    }

    /**
     * Devuelve la baseUrl del módulo auth de Zwitcher.
     * @memberOf ApiConfigService
     */
    public getAuthUrl(): string {
        return `${this.protocol}auth.${this.domain}`;
    }

    /**
     * Devuelve la baseUrl del módulo Personas.
     * @memberOf ApiConfigService
     */
    public getPersonaUrl(): string {
        return `${this.protocol}api.persona`;
    }

    /**
     * Devuelve la baseUrl del módulo Personas.
     * @memberOf ApiConfigService
     */
    public getPaisesUrl(): string {
        return `${this.protocol}api.persona`;
    }

    /**
     * Devuelve la url del api de prueba.
     */
    public getApiUrl(): string {
        return this.apiUrl;
    }

    /**
     * Devuelve el grandType para login.
     */
    public getGrandType(): string {
        return this.grantType;
    }
}
