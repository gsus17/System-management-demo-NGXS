'use strict';

import { AccountStatus } from './account-status.entity';
import { RegionalData } from './regional-data.entity';
import { Bien } from './bien.entity';
import { Sexo } from './sexo.entity';
import { Pais } from './pais.entity';

/**
 * Datos de una Persona.
 */
export interface Persona {

    /**
     * Identificador de la entidad.
     */
    id: number;

    /**
     * Apellido y nombre/s.
     */
    nombreCompleto: string;

    /**
     * Dirección de correo electrónico.
     */
    eMail: string;

    /**
     * Fecha de creación de este registro (UTC).
     */
    // Se cambia el tipo Date por string.
    fechaCreo: string;

    /**
     * Fecha de la última modificación de este registro (UTC).
     */
    // Se cambia el tipo Date por string.
    fechaActualizo: string;

    /**
     * Importe total de los ahorros.
     */
    totalAhorro: number;

    /**
     * Porcentaje de ahorro sobre el sueldo.
     */
    porcAhorro: number;

    /**
     * Observaciones o comentarios.
     */
    obs: string;

    /**
     * Dirección completa.
     */
    direccion: string;

    /**
     * Latitud de la dirección.
     */
    lat: number;

    /**
     * Longitud de la dirección.
     */
    lon: number;

    /**
     * Estado de la persona.
     */
    estado: AccountStatus;

    /**
     * Fecha de nacimiento.
     */
    // Se cambia el tipo Date por string.
    fechaNacimiento: string;

    /**
     * Determina se se le envían o no notificaciones.
     */
    recibirNotificaciones: boolean;

    /**
     * Información regional.
     */
    regionalData: RegionalData;

    /**
     * Bienes personales.
     */
    bienes: Bien[];

    /**
     * País de nacimiento.
     */
    nacionalidad: Pais;

    /**
     * País de nacimiento.
     */
    sexo: Sexo;
}
