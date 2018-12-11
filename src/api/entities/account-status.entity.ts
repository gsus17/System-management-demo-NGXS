/**
 * Estado de cuenta.
 * @export
 * @enum {number}
 */
export enum AccountStatus {
  /**
   * Estado Activa.
   */
  active = <any>'Active',

  /**
   * Estado Inactiva.
   */
  inactive = <any>'Inactive',

  /**
   * Estado Suspendida.
   */
  suspended = <any>'Suspended',

  /**
   * Estado Eliminada (lógico).
   */
  deleted = <any>'Deleted'
}
