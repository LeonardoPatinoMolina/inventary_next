
import {URL} from './globalsServices'

//peticion a api sevicio INGRESO con los datos correspondientes de operador
async function loginOperator({ cedula, password }) {
  try {

    const resultFetch = await fetch(URL.ingresar, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `operador&cedula=${cedula}&password=${password}`
    });
    const result = await resultFetch.json();
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

//peticion a api sevicio INGRESO con los datos correspondientes de administrador
async function loginAdmin({ nombre, password }) {
  try {

    const resultFetch = await fetch(URL.ingresar, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `admin&nombre=${nombre}&password=${password}`
    });
    const result = await resultFetch.json();
    return result;

  } catch (error) {
    console.log(error);
    return false;
  }
}

export { loginOperator, loginAdmin };