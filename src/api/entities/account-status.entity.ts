/**
 * Estado de cuenta.
 * @export
 * @enum {number}
 */
export enum AccountStatus {

  /**
   * Estado Activa.
   */
  active = 'Active',

  /**
   * Estado Inactiva.
   */
  inactive = 'Inactive',

  /**
   * Estado Suspendida.
   */
  suspended = 'Suspended',

  /**
   * Estado Eliminada (lógico).
   */
  deleted = 'Deleted'
}
