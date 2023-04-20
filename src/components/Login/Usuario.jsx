import { useState } from "react";
import { useModal } from "../../Hooks/useModal";
import { useInitSession } from '../../Hooks/useInitSession'
import Modal from "../Modal";


export default function Usuario() {//contexto 3

  const [isOpenAviso, openModalAviso, closeModalAviso] = useModal(false);
  const [isOpenWarning, openModalWarning, closeModalWarning] = useModal(false);
  const {logIn} = useInitSession();

  const [formData, setformData] = useState({pass: "", name: ""});

  const clickIngresar = async (e) => {
    e.preventDefault();
    e.target.setAttribute('disabled', '');
    const data = {
      user: 'operador',
      data:{
        cedula: formData.name, 
        password: formData.pass
      }
    };
    openModalAviso();
    const resLog = await logIn(data);
    closeModalAviso();
    if (!resLog.login) {
      e.target.removeAttribute('disabled', '');
      if(resLog.info === 'format'){
        console.log('formato');
        return openModalWarning();
      }
      if(resLog.info === 'error'){
        console.log('error');
        return openModalWarning();
      }
      if(resLog.info === 'unauthorized'){
        console.log('no autorizado');
        return openModalWarning();
      }
    }
  };

  return (
    <>
    <Modal
        title='AVISO'
        modalType='espera'
        isOpen={isOpenAviso}
      >
        Por favor espere mientras validamos la información...
      </Modal>
      <Modal
        title='ADVERTENCIA'
        modalType='aviso'
        isOpen={isOpenWarning}
        closeModal={closeModalWarning}
      >
        La información de operador está errada
      </Modal>
      <h2>INGRESO DE OPERADOR</h2>
      <form
        id="form_login"
        className="login__form"
        onSubmit={(e) => clickIngresar(e)}
        >
        <ul className="login__form-list">
          <li className="login__item">
            <label
              className="login__label"
              htmlFor="form_login">Cedula</label>
            <input
              type="text"
              className="login__text-field-name"
              placeholder="cedula"
              defaultValue={formData.name}
              onChange={(e)=> setformData({...formData, name: e.target.value})}
              required
            />
          </li>
          <li className="login__item">
            <label
              className="login__label"
              htmlFor="form_login">Contraseña</label>
            <input
              type="password"
              className="login__text-field-password"
              placeholder="contraseña"
              defaultValue={formData.pass}
              onChange={(e)=> setformData({...formData, pass: e.target.value})}
              required
            />
          </li>
          <li className="login__item">
            <button
              className="login__submit boton"
            >
              Ingresar
              <span className="material-symbols-outlined">
                login
              </span>
            </button>
          </li>
        </ul>
      </form>
    </>
  );
}

