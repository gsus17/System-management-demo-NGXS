import { Injectable } from '@angular/core';
import { AccountStatus } from '../entities/account-status.entity';
import { Sexo } from '../entities/sexo.entity';
import { Persona } from '../entities/persona.entity';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasApiService {

  private personsList: Persona[] = [
    {
      id: 16,
      nombreCompleto: 'Error, Cuatro',
      eMail: 'cuatro@error.com',
      fechaCreo: '2017-04-12T00:00:00',
      fechaActualizo: '2017-04-12T00:00:00',
      totalAhorro: 0,
      porcAhorro: 0,
      obs: 'delete_500, getById_500, getByEmail_500',
      direccion: 'Unknown',
      lat: 21.334933, 'lon': -157.853097,
      estado: AccountStatus.active,
      fechaNacimiento: '1945-09-09T00:00:01',
      recibirNotificaciones: false,
      regionalData: { dateFormat: 'mm/dd/yyyy', timeFormat: 'HH:mm:ss', languageCode: 'en', timeZone: null },
      bienes: null,
      nacionalidad: 'United States of America',
      sexo: Sexo.sinEspecificar
    },
    {
      id: 15,
      nombreCompleto: 'Error, Tres',
      eMail: 'cuatro@error.com',
      fechaCreo: '2017-04-12T00:00:00',
      fechaActualizo: '2017-04-12T00:00:00',
      totalAhorro: 0,
      porcAhorro: 0,
      obs: 'delete_EAAE, getById_EAAE, getByEmail_EAAE',
      direccion: 'Unknown',
      lat: 21.334933, 'lon': -157.853097,
      estado: AccountStatus.inactive,
      fechaNacimiento: '1945-09-09T00:00:01',
      recibirNotificaciones: false,
      regionalData: { dateFormat: 'dd/mm/yyyy', timeFormat: 'hh:mm:ss tt', languageCode: 'en', timeZone: null },
      bienes: null,
      nacionalidad: 'United States of America',
      sexo: Sexo.sinEspecificar
    },
    {
      id: 14,
      nombreCompleto: 'Error, Dos',
      eMail: 'dos@error.com',
      fechaCreo: '2017-04-12T00:00:00',
      fechaActualizo: '2017-04-12T00:00:00',
      totalAhorro: 0,
      porcAhorro: 0,
      obs: 'delete_EAAI, getById_EAAI, getByEmail_EAAI',
      direccion: 'Unknown',
      lat: 21.334933, 'lon': -157.853097,
      estado: AccountStatus.inactive,
      fechaNacimiento: '1945-09-09T00:00:01',
      recibirNotificaciones: false,
      regionalData: { dateFormat: 'dd/mm/yyyy', timeFormat: 'hh:mm:ss tt', languageCode: 'en', timeZone: null },
      bienes: null,
      nacionalidad: 'United States of America',
      sexo: Sexo.sinEspecificar
    },
    {
      id: 13,
      nombreCompleto: 'Error, Uno',
      eMail: 'uno@error.com',
      fechaCreo: '2017-04-12T00:00:00',
      fechaActualizo: '2017-04-12T00:00:00',
      totalAhorro: 0,
      porcAhorro: 0,
      obs: 'delete_EPN, getById_EPN, getByEmail_EPN',
      direccion: 'Unknown',
      lat: 21.334933, 'lon': -157.853097,
      estado: AccountStatus.suspended,
      fechaNacimiento: '1945-09-09T00:00:01',
      recibirNotificaciones: false,
      regionalData: { dateFormat: 'dd/mm/yyyy', timeFormat: 'HH:mm:ss', languageCode: 'en', timeZone: null },
      bienes: null,
      nacionalidad: 'United States of America',
      sexo: Sexo.sinEspecificar
    },
    {
      id: 12,
      nombreCompleto: 'Quigley, Margaret Denise',
      eMail: 'margaretdenise@nikita.com',
      fechaCreo: '2017-04-12T00:00:00',
      fechaActualizo: '2017-04-12T00:00:00',
      totalAhorro: 19,
      porcAhorro: 0,
      obs: 'Sin Obsevaciones.',
      direccion: '24 North St, Boston',
      lat: 21.334933, 'lon': -157.853097,
      estado: AccountStatus.active,
      fechaNacimiento: '1979-05-22T00:00:00',
      recibirNotificaciones: true,
      regionalData: { dateFormat: 'mm/dd/yyyy', timeFormat: 'HH:mm:ss', languageCode: 'en', timeZone: null },
      bienes: [
        { id: 0, tipo: 'Inmueble', descripcion: 'Departamento', valor: 150000 },
        { id: 0, tipo: 'Mueble', descripcion: 'Auto', valor: 27000 },
        { id: 0, tipo: 'Mueble', descripcion: 'Bote', valor: 17000 }
      ],
      nacionalidad: 'United States of America',
      sexo: Sexo.femenino
    },
    {
      id: 11,
      nombreCompleto: 'Thurman, Uma Karuna',
      eMail: 'umathurman@killbill.com',
      fechaCreo: '2017-04-12T00:00:00',
      fechaActualizo: '2017-04-12T00:00:00',
      totalAhorro: 19,
      porcAhorro: 0,
      obs: 'Sin Obsevaciones.',
      direccion: '24 North St, Boston',
      lat: 42.360725, 'lon': -71.055742,
      estado: AccountStatus.active,
      fechaNacimiento: '1970-04-29T00:00:00',
      recibirNotificaciones: true,
      regionalData: { dateFormat: 'mm/dd/yyyy', timeFormat: 'HH:mm:ss', languageCode: 'en', timeZone: null },
      bienes: [
        { id: 0, tipo: 'Inmueble', descripcion: 'Departamento', valor: 1000000 },
        { id: 0, tipo: 'Mueble', descripcion: 'Moto', valor: 11000 },
        { id: 0, tipo: 'Mueble', descripcion: 'Katana', valor: 15000 }
      ],
      nacionalidad: 'United States of America',
      sexo: Sexo.femenino
    },
    {
      id: 10,
      nombreCompleto: 'White ,Walter',
      eMail: 'heisenberg@saymyname.com',
      fechaCreo: '2017-04-12T00:00:00',
      fechaActualizo: '2017-04-12T00:00:00',
      totalAhorro: 5,
      porcAhorro: 0,
      obs: 'Sin Obsevaciones.',
      direccion: 'Ave Albuquerque 17, Nuevo Mexico',
      lat: 33.680836,
      lon: -106.643667,
      estado: AccountStatus.active,
      fechaNacimiento: '1967-03-30T00:00:00',
      recibirNotificaciones: true,
      regionalData: { dateFormat: 'mm/dd/yyyy', timeFormat: 'hh:mm:ss tt', languageCode: 'en', timeZone: null },
      bienes: [
        { id: 0, tipo: 'Inmueble', descripcion: 'Casa', valor: 90000 },
        { id: 0, tipo: 'Mueble', descripcion: 'Motorhome', valor: 3000 },
        { id: 0, tipo: 'Mueble', descripcion: 'Camioneta', valor: 20000 }
      ],
      nacionalidad: 'United States of America',
      sexo: Sexo.masculino
    },
    {
      id: 9,
      nombreCompleto: 'Smith ,Willard Carroll',
      eMail: 'smithwill@pensilvania.com',
      fechaCreo: '2017-04-12T00:00:00',
      fechaActualizo: '2017-04-12T00:00:00',
      totalAhorro: 350,
      porcAhorro: 0,
      obs: 'Sin Obsevaciones.',
      direccion: '413 8th Ave, New York',
      lat: 40.750162,
      lon: -73.99486,
      estado: AccountStatus.inactive,
      fechaNacimiento: '1968-09-25T00:00:00',
      recibirNotificaciones: true,
      regionalData: { dateFormat: 'mm/dd/yyyy', timeFormat: 'hh:mm:ss tt', languageCode: 'en', timeZone: null },
      bienes: [
        { id: 0, tipo: 'Inmueble', descripcion: 'Mansion', valor: 1300000 },
        { id: 0, tipo: 'Mueble', descripcion: 'Camion Trailer', valor: 1500000 },
        { id: 0, tipo: 'Mueble', descripcion: 'Avion ', valor: 1050000 }
      ],
      nacionalidad: 'United States of America',
      sexo: Sexo.masculino
    },
    {
      id: 8,
      nombreCompleto: 'Stallone, Sylvester Gardenzio',
      eMail: 'stallonesylvester@newyork.com',
      fechaCreo: '2017-04-12T00:00:00',
      fechaActualizo: '2017-04-12T00:00:00',
      totalAhorro: 908,
      porcAhorro: 0,
      obs: 'Sin Obsevaciones.',
      direccion: 'Lainbach 6, Austria',
      lat: 40.668924,
      lon: -73.94809,
      estado: AccountStatus.suspended,
      fechaNacimiento: '1946-07-06T00:00:00',
      recibirNotificaciones: true,
      regionalData: { dateFormat: 'dd/mm/yyyy', timeFormat: 'hh:mm:ss tt', languageCode: 'en', timeZone: null },
      bienes: [
        { id: 0, tipo: 'Inmueble', descripcion: 'Mansion', valor: 2000000 },
        { id: 0, tipo: 'Mueble', descripcion: 'Jet Privado', valor: 3000000 },
        { id: 0, tipo: 'Mueble', descripcion: 'Motocicleta', valor: 150000 }
      ],
      nacionalidad: 'United States of America',
      sexo: Sexo.masculino
    },
    {
      id: 7,
      nombreCompleto: 'Schwarzenegger, Arnold Alois',
      eMail: 'arnoldalois@tallaustria.com',
      fechaCreo: '2017-04-12T00:00:00',
      fechaActualizo: '2017-04-12T00:00:00',
      totalAhorro: 500,
      porcAhorro: 0,
      obs: 'Sin Obsevaciones.',
      direccion: 'Lainbach 6, Austria',
      lat: 47.635998,
      lon: 14.767359,
      estado: AccountStatus.suspended,
      fechaNacimiento: '1947-07-30T00:00:00',
      recibirNotificaciones: true,
      regionalData: { dateFormat: 'dd/mm/yyyy', timeFormat: 'hh:mm:ss tt', languageCode: 'en', timeZone: null },
      bienes: [
        { id: 0, tipo: 'Inmueble', descripcion: 'Centro Comercial', valor: 70000000 },
        { id: 0, tipo: 'Mueble', descripcion: 'Ferrari', valor: 500000 },
        { id: 0, tipo: 'Mueble', descripcion: 'Yate', valor: 100000 }
      ],
      nacionalidad: 'Austria',
      sexo: Sexo.masculino
    },
    {
      id: 6,
      nombreCompleto: 'Dicaprio, Leonardo',
      eMail: 'dicaprio@wallstreet.com',
      fechaCreo: '2017-04-12T00:00:00',
      fechaActualizo: '2017-04-12T00:00:00',
      totalAhorro: 135,
      porcAhorro: 0,
      obs: 'Sin Obsevaciones.',
      direccion: 'St Hollywood 1616',
      lat: 34.096873, 'lon': -118.329093,
      estado: AccountStatus.inactive,
      fechaNacimiento: '1974-11-11T00:00:00',
      recibirNotificaciones: true,
      regionalData: { dateFormat: 'mm/dd/yyyy', timeFormat: 'HH:mm:ss', languageCode: 'en', timeZone: null },
      bienes: [
        { id: 0, tipo: 'Inmueble', descripcion: 'Mansion', valor: 2000000 },
        { id: 0, tipo: 'Mueble', descripcion: 'Formula E', valor: 5000000 },
        { id: 0, tipo: 'Mueble', descripcion: 'Oscar de Oro', valor: 180000 }
      ],
      nacionalidad: 'United States of America',
      sexo: Sexo.masculino
    },
    {
      id: 5,
      nombreCompleto: 'Peter, Pan',
      eMail: 'peter@disney.com',
      fechaCreo: '2017-04-12T00:00:00',
      fechaActualizo: '2017-04-12T00:00:00',
      totalAhorro: 20,
      porcAhorro: 0,
      obs: '',
      direccion: 'Av Nunca Jamas 1414',
      lat: 43.945035,
      lon: -84.619768,
      estado: AccountStatus.active,
      fechaNacimiento: '1984-12-27T00:00:00',
      recibirNotificaciones: true,
      regionalData: { dateFormat: 'mm/dd/yyyy', timeFormat: 'hh:mm:ss tt', languageCode: 'en', timeZone: null },
      bienes: [
        { id: 0, tipo: 'Mueble', descripcion: 'Daga', valor: 500 }
      ],
      nacionalidad: 'United States of America',
      sexo: Sexo.masculino
    },
    {
      id: 4,
      nombreCompleto: 'Espindola, Ricardo',
      eMail: 'richard@gmail.com',
      fechaCreo: '2015-02-01T00:00:00',
      fechaActualizo: '2015-01-01T00:00:00',
      totalAhorro: 107,
      porcAhorro: 0,
      obs: 'Sin Obsevaciones.',
      direccion: 'Direccion de Richard',
      lat: -34.6377278,
      lon: -58.4098517,
      estado: AccountStatus.active,
      fechaNacimiento: '1984-02-25T00:00:00',
      recibirNotificaciones: true,
      regionalData: { dateFormat: 'mm/dd/yyyy', timeFormat: 'HH:mm:ss', languageCode: 'es', timeZone: null },
      bienes: [
        { id: 0, tipo: 'Inmueble', descripcion: 'Departamento', valor: 100000 },
        { id: 0, tipo: 'Mueble', descripcion: 'Apple Watch', valor: 7000 },
        { id: 0, tipo: 'Mueble', descripcion: 'GoPro 4', valor: 4000 }
      ],
      nacionalidad: 'Argentina',
      sexo: Sexo.masculino
    },
    {
      id: 3,
      nombreCompleto: 'Jaque, Néstor E.',
      eMail: 'nestor@gmail.com',
      fechaCreo: '2015-01-01T00:00:00',
      fechaActualizo: '2015-01-01T00:00:00',
      totalAhorro: 1500.6,
      porcAhorro: 100,
      obs: 'Sin Obsevaciones.',
      direccion: 'Direccion de Néstor', 'lat': -34.6377278,
      lon: -58.4098517,
      estado: AccountStatus.suspended,
      fechaNacimiento: '1984-11-04T00:00:00',
      recibirNotificaciones: true,
      regionalData: { dateFormat: 'dd/mm/yyyy', timeFormat: 'hh:mm:ss tt', languageCode: 'es', timeZone: null },
      bienes: null,
      nacionalidad: 'Argentina',
      sexo: Sexo.masculino
    },
    {
      id: 2,
      nombreCompleto: 'Eiff, Damián A.',
      eMail: 'damian@gmail.com',
      fechaCreo: '2015-01-01T00:00:00',
      fechaActualizo: '2015-01-01T00:00:00',
      totalAhorro: 10,
      porcAhorro: 10,
      obs: 'Sin Obsevaciones.',
      direccion: 'Dirección de Damián',
      lat: -34.6377278,
      lon: -58.4098517,
      estado: AccountStatus.inactive,
      fechaNacimiento: '1971-02-17T00:00:00',
      recibirNotificaciones: false,
      regionalData: { dateFormat: 'mm/dd/yyyy', timeFormat: 'hh:mm:ss tt', languageCode: 'es', timeZone: null },
      bienes: [
        { id: 0, tipo: 'Inmueble', descripcion: 'Departamento', valor: 150000 }
      ],
      nacionalidad: 'Argentina',
      sexo: Sexo.masculino
    },
    {
      id: 1,
      nombreCompleto: 'Somma, Esteban H.',
      eMail: 'esteban@gmail.com',
      fechaCreo: '2015-01-01T00:00:00',
      fechaActualizo: '2015-01-01T00:00:00',
      totalAhorro: 0,
      porcAhorro: 1,
      obs: 'Sin Observaciones.',
      direccion: 'Dirección de Esteban',
      lat: -34.6377278, 'lon': -58.4098517,
      estado: AccountStatus.suspended,
      fechaNacimiento: '1974-03-01T00:00:00',
      recibirNotificaciones: true,
      regionalData: { dateFormat: 'mm/dd/yyyy', timeFormat: 'hh:mm:ss tt', languageCode: 'es', timeZone: null },
      bienes: [
        { id: 0, tipo: 'Mueble', descripcion: 'Auto Ford Eco Sport', valor: 10000 },
        { id: 0, tipo: 'Mueble', descripcion: 'Teléfono WindowsPhone', valor: 1500 }
      ],
      nacionalidad: 'Argentina',
      sexo: Sexo.masculino
    }];

  constructor() { }

  /**
   * Request an OpenId Authentication.
   */
  public getPersonas$(): Observable<Persona[]> {
    console.log(`${PersonasApiService.name}::getPersona`);
    return of(this.personsList);
  }
}
