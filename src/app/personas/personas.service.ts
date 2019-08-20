import { Injectable } from '@angular/core';
import { TimeZone } from 'src/api/entities/time-zone.entity';
import { Sexo } from 'src/api/entities/sexo.entity';
import { AccountStatus } from 'src/api/entities/account-status.entity';

@Injectable({
  providedIn: 'root'
})
export class PersonasServiceSingleton {
  constructor() { }

  /**
   * Devuelve una lista de los estados de cuenta existentes.
   */
  public getAccountStatusList(): AccountStatus[] {
    const ret: AccountStatus[] = [
      AccountStatus.active,
      AccountStatus.inactive,
      AccountStatus.suspended
    ];
    return ret;
  }

  /**
   * Devuelve una lista de sexos existentes.
   */
  public getSexos(): Sexo[] {
    const ret: Sexo[] = [
      Sexo.femenino,
      Sexo.masculino,
      Sexo.sinEspecificar
    ];
    return ret;
  }

  /**
   * Devuelve una lista de formatos de fechas existentes.
   */
  public getDateFormats(): string[] {
    const ret: string[] = [
      'dd/mm/yyyy',
      'mm/dd/yyyy'
    ];
    return ret;
  }

  /**
   * Devuelve una lista de formatos de hora existentes.
   */
  public getTimeFormats(): string[] {
    const ret: string[] = [
      'HH:mm:ss',
      'hh:mm:ss tt'
    ];
    return ret;
  }

  /**
   * Devuelve una lista de timezone existentes.
   */
  public getTimeZones(): TimeZone[] {

    const timeZoneBA: TimeZone = {
      timeZoneId: '1',
      timeZoneName: 'America/Argentina/Buenos_Aires',
      dstOffset: '-03:00',
      rawOffset: '-03:00'
    };

    const timeZoneBR: TimeZone = {
      timeZoneId: '2',
      timeZoneName: '	America/Sao_Paulo',
      dstOffset: '-02:00',
      rawOffset: '-03:00'
    };

    const timeZoneUS: TimeZone = {
      timeZoneId: '3',
      timeZoneName: 'US/Alaska',
      dstOffset: '-08:00',
      rawOffset: '-09:00'
    };

    const ret: TimeZone[] = [
      timeZoneBA,
      timeZoneBR,
      timeZoneUS
    ];

    return ret;
  }

  /**
   * Devuelve una lista de idiomas existentes.
   */
  public getLanguageCodes(): string[] {
    const ret: string[] = [
      'es',
      'en',
      'pt'
    ];

    return ret;
  }

  /**
   * Devuelve una lista de categorías de bienes existentes.
   */
  public getCategoriesBienes(): string[] {
    const ret: string[] = [
      'Mueble',
      'Inmueble',
      'De uso',
      'Otro'
    ];

    return ret;
  }

  /**
   * Genera UUID para los bienes correspondiente al nuevo usuario.
   */
  public generateUUIDToPersonProperty(): string {
    // Public Domain/MIT

    let d: number = new Date().getTime();
    // tslint:disable-next-line:no-typeof-undefined
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      // Use high-precision timer if available
      d += performance.now();
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string) => {
      // tslint:disable-next-line:no-bitwise
      const r: number = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);

      // tslint:disable-next-line:no-bitwise
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}
