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
  public getPersonas$(pageIndex: number, pageSize: number): Observable<Persona[]> {
    return this.personasApiService.getPersonas$(pageIndex, pageSize);
  }

  /**
   * Crea una persona.
   */
  public addPerson(formulario: Form): Promise<void> {
    console.log(`${PersonasService.name}:: createPerson`);

    const newId = parseInt(this.generateUUID(), 10);
    const person: Persona = {
      id: newId,
      nombreCompleto: formulario.name,
      eMail: formulario.email,
      fechaCreo: new Date().toDateString(),
      fechaActualizo: new Date().toDateString(),
      totalAhorro: 0,
      porcAhorro: 0,
      obs: '',
      direccion: formulario.address,
      lat: 0,
      lon: 0,
      estado: formulario.status,
      fechaNacimiento: formulario.birthdate.toDateString(),
      recibirNotificaciones: formulario.enableNotify,
      regionalData: formulario.regionalData,
      bienes: null,
      nacionalidad: null,
      sexo: formulario.gender
    };

    return this.personasApiService.post(person);
  }

  /**
   * Actualiza una persona.
   */
  public updatePerson(form: Form): Promise<void> {
    console.log(`${PersonasService.name}:: updatePerson`);
    const person: Persona = this.mapFormToPerson(form);
    return this.personasApiService.put(person);
  }

  /**
   * Elimina una persona en base a su Id.
   */
  public deletePersona(id: string): Promise<void> {
    console.log(`${PersonasService.name}:: deletePersona`);
    return this.personasApiService.deleteById(id);
  }

  /**
   * Devuelve una persona segun su id.
   */
  public getById$(id: string) {
    const methodName: string = `${PersonasService.name}::getFormPersonaById`;
    console.log(`${methodName}`);
    return this.personasApiService.getById$(id);
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
          const personFiltered = persons[0];
          const form: Form = {
            id: personFiltered.id === undefined ? null : personFiltered.id,
            address: personFiltered.direccion,
            regionalData: personFiltered.regionalData,
            bienes: personFiltered.bienes === null || personFiltered.bienes === undefined ? [] : personFiltered.bienes,
            ahorro: personFiltered.totalAhorro,
            ahorroPercentage: personFiltered.porcAhorro,
            birthdate: new Date(),
            email: personFiltered.eMail,
            enableNotify: false,
            gender: personFiltered.sexo,
            name: personFiltered.nombreCompleto,
            status: personFiltered.estado,
            obs: personFiltered.obs
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

  /**
   * Genera UUID.
   */
  public generateUUID(): string {
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

  /**
   * Mapea de la entidad form a la entidad person.
   */
  private mapFormToPerson(form: Form) {
    const person: Persona = {
      id: form.id,
      nombreCompleto: form.name,
      eMail: form.email,
      fechaCreo: new Date().toDateString(),
      fechaActualizo: new Date().toDateString(),
      totalAhorro: 0,
      porcAhorro: 0,
      obs: form.obs,
      direccion: form.address,
      lat: 0,
      lon: 0,
      estado: form.status,
      fechaNacimiento: form.birthdate.toDateString(),
      recibirNotificaciones: form.enableNotify,
      regionalData: form.regionalData,
      bienes: form.bienes,
      nacionalidad: null,
      sexo: form.gender
    };

    return person;
  }
}
