/** Contiene un mensaje de estado para responder a una petición que produjo un error. */
export interface StatusMessage {

    /** HTTP response status code (e.g. 401). */
    code: string;

    /** HTTP response status code description (e.g. "Unauthorized"). */
    descrip: string;

    /** Date and time (UTC). */
    timeStamp: string;

    /** Identificador único de error para poder referenciarlo con el log de excepciones. */
    errorUniqueId?: string;

    /** Error code for business rules treatment (e.g. "ERR.AUTH.ACCESSTOKEN.INVALID"). */
    errorCode?: string;

    /** Error message (e.g. "AccessToken invalid."). */
    message: string;

    /** List of validation errors. */
    // tslint:disable-next-line: no-any Se deshabilita ya que no se establece el tipo de la variable.
    validationErrors?: any;

    /** Datos adicionales del error. */
    // tslint:disable-next-line:no-any
    customData?: { [key: string]: any };

    /** Código único de error generado en el cliente. */
    uiErrorUniqueId?: string;
}

