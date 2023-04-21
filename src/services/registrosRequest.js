import { URL } from "./globalsServices";

const registrarProducto = async (data) => {

  try {
    const datos = JSON.stringify(data);

    const result = await fetch(URL.registrar, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `producto=b&data=${datos}`
    });
    const jsonR = await result.json();
    return jsonR;
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

const registrarOperador = async (data) => {

  try {
    const datos = JSON.stringify(data);

    const result = await fetch(URL.registrar, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `operador=b&data=${datos}`
    });
    const jsonR = await result.json();
    return jsonR;
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

const registrarImpresion = async (dataProducto) =>{
  
  try {
    const datos = JSON.stringify(dataProducto);
    const result = await fetch(URL.registrar, {//products a registrar para control
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `impresion=b&data=${datos}`
    });//fetch end
    const jsonR = await result.json();
    return jsonR;
  } catch (error) {
    console.log(error);
  }
}

export { registrarProducto, registrarOperador, registrarImpresion };