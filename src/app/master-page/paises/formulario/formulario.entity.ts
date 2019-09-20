import { Pais } from 'src/api/entities/pais.entity';

/**
 * Modelo de la vista de formulario de bienes.
 * @export
 */
export interface CountryForm extends Pais {
  modify: boolean;
}
