import { Injectable } from '@angular/core';
import { TimeZone } from 'src/api/entities/time-zone.entity';
import { Sexo } from 'src/api/entities/sexo.entity';
import { AccountStatus } from 'src/api/entities/account-status.entity';
import { Persona } from 'src/api/entities/persona.entity';
import { PersonasApiService } from 'src/api/personas/personas-api.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Form } from './formulario/formulario';


@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  constructor(private personasApiService: PersonasApiService) { }

  /**
   * Devuelve el listado de personas.
   */
  public getPersonas$(): Observable<Persona[]> {
    return this.personasApiService.getPersonas$();
  }

  /**
   * Devuelve el formulario correspondiente.
   */
  public getFormPersonaById$(id: string): Observable<Form> {
    const methodName: string = `${PersonasService.name}::getFormPersonaById`;
    console.log(`${methodName}`);
    return this.personasApiService.getPersonas$()
      .pipe(
        map(persons => {
          const personFiltered = persons.filter(person => person.id === +id)[0];
          const form: Form = {
            address: '',
            regionalData: personFiltered.regionalData,
            bienes: personFiltered.bienes,
            ahorro: personFiltered.totalAhorro,
            ahorroPercentage: personFiltered.porcAhorro,
            birthdate: new Date(),
            email: personFiltered.eMail,
            enableNotify: false,
            gender: personFiltered.sexo,
            name: personFiltered.nombreCompleto,
            status: personFiltered.estado
          };

          return form;
        }),

        tap((form) => console.log(`${methodName} form %o`, form)),
      );
  }

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
}
