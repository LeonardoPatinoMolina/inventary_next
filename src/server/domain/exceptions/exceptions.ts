
export enum ProductException {
  NOT_FOUND = 'Datos de producto no encontrados',
  FIND_ERROR = 'ocurrió un error en la consulta de datos de productos',
  EDIT_ERROR = 'ocurrió un error en la edición de datos de productos'
}
export enum AdminException {
  NOT_FOUND = 'Datos de administrador no encontrados',
  FIND_ERROR = 'ocurrió un error en la consulta de datos de administrador',
  EDIT_ERROR = 'ocurrió un error en la edición de datos de administrador',
  INSERT_ERROR = 'ocurrió un error en la inserción de nuevo registro en repositorio de administrador'
}