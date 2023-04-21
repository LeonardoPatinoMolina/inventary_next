import {URL} from './globalsServices'

const consultarDatosProducto = async () => {
  try {
    const resultFetch = await fetch(URL.consultar+'?productos');
    const result = await resultFetch.json();
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const consultarDatosOperador = async () => {
  try {
    const resultFetch = await fetch(URL.consultar+'?operadores');
    const result = await resultFetch.json();
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const consultarDatosRegistro = async () => {
  try {
    const resultFetch = await fetch(URL.consultar+'?registros');
    const result = await resultFetch.json();
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { consultarDatosProducto, consultarDatosOperador, consultarDatosRegistro };