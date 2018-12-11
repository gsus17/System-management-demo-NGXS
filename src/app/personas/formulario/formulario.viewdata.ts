'use strict';

import { Sexo } from '../../../api/entities/sexo.entity';
import { AccountStatus } from '../../../api/entities/account-status.entity';
import { TimeZone } from '../../../api/entities/time-zone.entity';

/**
 * ViewData para la vista Formulario de personas.
 * @export
 */
export interface PersonasFormularioViewData {

    /**
     * True si el componente esta esperando una respuesta de datos. False de lo contrario.
     */
    inProgress: boolean;

    /**
     * Estado del formulario.
     */
    // formState?: FormStates;

    /**
     * True si el formulario se encuentra bloqueado. False de lo contrario.
     */
    isLocked: boolean;

    /**
     * True si la seccion regional data se encuentra expandida. False de lo contrario.
     */
    isExpandedRegionalData: boolean;

    /**
     * True si la seccion bienes se encuentra expandida. False de lo contrario.
     */
    isExpandedBienes: boolean;

    /**
     * Lista de sexos.
     */
    sexos: Sexo[];

    /**
     * Lista de estados de cuenta.
     */
    accountStatusList: AccountStatus[];

    /**
     * Lista de formatos de fecha
     */
    dateFormats?: string[];

    /**
     * Lista de formatos de horarios.
     */
    timeFormats?: string[];

    /**
     * Lista de formatos de TimeZones.
     */
    timeZones?: TimeZone[];

    /**
     * Lista de países
     */
    // nationalities?: Pais[];

    /**
     * Lista de idiomas
     */
    languageCodes?: string[];
}
