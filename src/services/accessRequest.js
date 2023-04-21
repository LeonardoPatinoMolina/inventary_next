
import {URL} from './globalsServices'


async function configAcceso(password) {
  try {

    const resultFetch = await fetch(URL.ingresar, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `configAccess&password=${password}`
    });
    const result = await resultFetch.json();
    return result;

  } catch (error) {
    console.log(error);
    return false;
  }
}
async function AccesoOperador() {
  try {
    let sessionCookieS = document.cookie.split(';').find(c => c.trim().startsWith('session='));
    if((sessionCookieS) === undefined ) return {login: false, info: "sessionExp"}
    let sessionCookie = sessionCookieS.substring(8);
    
    const resultFetch = await fetch(URL.ingresar, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `operadorAccess&session=${sessionCookie}`
    });
    const result = await resultFetch.json();
    console.log("operador",result);
    return result;
    
  } catch (error) {
    console.log(error);
    return {login: false, info: "fetch"};
  }
}

async function AccesoAdmin() {
  try {
    let sessionCookieS = document.cookie.split(';').find(c => c.trim().startsWith('session='));
    if((sessionCookieS) === undefined ) return {login: false, info: "sessionExp"}
    let sessionCookie = sessionCookieS.substring(8);
    const resultFetch = await fetch(URL.ingresar, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `adminAccess&session=${sessionCookie}`
    });
    const result = await resultFetch.json();
    console.log("admin",result);
    return result;

  } catch (error) {
    console.log(error);
    return {login: false, info: "fetch"};
  }
}

export { configAcceso, AccesoOperador, AccesoAdmin };