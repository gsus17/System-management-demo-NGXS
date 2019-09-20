/**
 * Estructura de datos del paginador.
 */
export interface Paginator {
  pageIndex: number;
  pageSize: number;
  length?: number;
  previousPageIndex?: number;
  pageSizeOptions?: number[];
}
