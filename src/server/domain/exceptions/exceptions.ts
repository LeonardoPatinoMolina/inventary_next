
export enum ProductException {
  NOT_FOUND = 'Datos de producto no encontrados',
  FIND_ERROR = 'ocurrió un error en la consulta de datos de productos',
  EDIT_ERROR = 'ocurrió un error en la edición de datos de productos',
  INSERT_ERROR = 'ocurrió un error en la inserción de nuevo registro en repositorio de productos',
  DELETE_ERROR = 'ocurrió un error al inetentar remover el regitro de producto en repositorio'
}

export enum RecordException {
  NOT_FOUND = 'Datos de registro no encontrados',
  FIND_ERROR = 'ocurrió un error en la consulta de datos de registro',
  EDIT_ERROR = 'ocurrió un error en la edición de datos de registro',
  INSERT_ERROR = 'ocurrió un error en la inserción de nuevo registro en repositorio',
  DELETE_ERROR = 'ocurrió un error al inetentar remover el regitro del repositorio'
}
export enum AdminException {
  NOT_FOUND = 'Datos de administrador no encontrados',
  FIND_ERROR = 'ocurrió un error en la consulta de datos de administrador',
  EDIT_ERROR = 'ocurrió un error en la edición de datos de administrador',
  INSERT_ERROR = 'ocurrió un error en la inserción de nuevo registro en repositorio de administrador'
}