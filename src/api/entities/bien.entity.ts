/**
 * Bienes personales de una persona.
 * @export
 */
export interface Bien {

    /**
     * Identificador del bien.
     */
    id: number;

    /**
     * Tipo de bien (Mueble, Inmueble).
     */
    tipo: string;

    /**
     * Descripción del bien.
     */
    descripcion: string;

    /**
     * Valor del bien.
     */
    valor: number;
}
