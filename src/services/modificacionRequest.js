import { URL } from "./globalsServices";

const modificarProducto = async (data)=>{
  try {
    const datos = JSON.stringify(data);
    
        const result = await fetch(URL.editar, {
          method: 'POST',
          headers:{'Content-Type' : 'application/x-www-form-urlencoded'},
          body: `data=${datos}`
        });
        console.log(result);
        const jsonR = await result.json();
        return jsonR;
      } catch (error) {
        console.log(error);
        return { success: false };
      }
};

const modificarOperador = async (data)=>{
    try {
        const datos = JSON.stringify(data);
        const result = await fetch(URL.editar, {
          method: 'POST',
          headers:{'Content-Type' : 'application/x-www-form-urlencoded'},
          body: `data=${datos}`
        });
        const jsonR = await result.json();
        return jsonR;
      } catch (error) {
        console.log(error);
        return { success: false };
      }
};

const modificarAdmin = async (data)=>{
    try {
        const datos = JSON.stringify(data);
        const result = await fetch(URL.editar, {
          method: 'POST',
          headers:{'Content-Type' : 'application/x-www-form-urlencoded'},
          body: `data=${datos}`
        });
        const jsonR = await result.json();
        return jsonR;
      } catch (error) {
        console.log(error);
        return { success: false };
      }
};

const eliminarProducto = async (data)=>{
    try {
        const datos = JSON.stringify(data);
    
        const result = await fetch(URL.editar, {
          method: 'POST',
          headers:{'Content-Type' : 'application/x-www-form-urlencoded'},
          body: `data=${datos}`
        });
        const jsonR = await result.json();
        return jsonR;
      } catch (error) {
        console.log(error);
        return { success: false };
      }
};

const eliminarOperador = async (data)=>{
    try {
        const datos = JSON.stringify(data);
    
        const result = await fetch(URL.editar, {
          method: 'POST',
          headers:{'Content-Type' : 'application/x-www-form-urlencoded'},
          body: `data=${datos}`
        });
        const jsonR = await result.json();
        return jsonR;
      } catch (error) {
        console.log(error);
        return { success: false };
      }
};



export { modificarProducto, modificarOperador, modificarAdmin, eliminarProducto, eliminarOperador }