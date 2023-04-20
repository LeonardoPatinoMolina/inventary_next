import { useRef } from "react";
// import { configAcceso } from '../services/accessRequest';
// import { modificarAdmin } from '../services/modificacionRequest';

interface useAdminConfigurationArgs {
  openModal: ()=>Promise<any>;
  closeModal: (choice: any)=>void;
}

export function useAdminConfiguration({openModal, closeModal}: useAdminConfigurationArgs) {

  const password = useRef<string | null>(null);

  const configFunction = async () => {
    const configElection = prompt(`
      ¿Qué aspecto de administracion desea configurar?
      1 :: Nombre de administrador
      2 :: Contraseña de administrador
    `);
    if (!configElection) return;
    if (!['1','2'].includes(configElection)) return alert('entrada no valida');

    password.current = prompt(`Ingrese la contraseña de administrador actual`);
    openModal();
    // const res = await verificarPass(password.current);
    closeModal('');
    // if (!res) return alert('datos erroneos');

    switch (configElection) {
      case '1':
        await configurarNombre();
        break;
      case '2':
        await configurarPassword();
        break;
      default:
        alert('entrada no valida');
        break;
    }
  };

  const verificarPass = async (password: string) => {
    // const envio = await configAcceso(password);
    // if (!envio.login) return false;
    // else return true;
    return true
  };

  const configurarNombre = async () => {
    const nombre = prompt(`
      Ingrese el nombre de su preferencia.
      (evite el uso de caracteres especiales)
    `);
    if(nombre === '' || nombre === null ) return alert('no realizado');
    const data = {
      objetivo: 'admin',
      nombre: nombre,
      password: 'def'
    }
    openModal();
    // const res = await modificarAdmin(data);
    closeModal('');
    // if (!res.success) return alert('tarea fallida');
    // return alert('tarea exitosa');
    alert('en proceso')
  };
  
  const configurarPassword = async () => {
    const password = prompt(`
      Ingrese la contraseña de su preferencia.
      (evite el uso de caracteres especiales)
    `);
    if(password === '' || password === null) return alert('no realizado');
    const data = {
      objetivo: 'admin',
      nombre: 'def',
      password: password
    }
    openModal();
    // const res = await modificarAdmin(data);
    closeModal('');
    // if (!res.success) return alert('tarea fallida');
    // return alert('tarea exitosa');
    alert('en proceso')
  };

  return configFunction;
}