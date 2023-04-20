import { useState } from "react";
import { useModal } from "../../Hooks/useModal";
import Modal from "../Modal";
import { useDispatch } from 'react-redux';
import { useInitSession } from '../../Hooks/useInitSession'

export default function Admin() {//contexto 3

  const dispatch = useDispatch();
  const [isOpenAviso, openModalAviso, closeModalAviso] = useModal(false);
  const [isOpenWarning, openModalWarning, closeModalWarning] = useModal(false);

  const {logIn} = useInitSession();
  const [formData, setFormData] = useState({pass: "", name: ""});

  const clickIngresar = async (e) => {
    e.preventDefault();
    e.target.setAttribute('disabled', '');
    const data = {
      user: 'admin',
      data: {
        nombre: formData.name,
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
        La información de administrador está errada
      </Modal>
      <h2>INGRESO DE ADMINISTRADOR</h2>
      <form
        id="form_login"
        className="login__form"
        onSubmit={(e) => clickIngresar(e)}
        >
        <ul className="login__form-list">
          <li className="login__item">
            <label
              className="login__label"
              htmlFor="form_login">Nombre</label>
            <input
              type="text"
              className="login__text-field-name"
              placeholder="nombre de administrador"
              defaultValue={formData.name}
              onChange={(e)=> setFormData({...formData, name: e.target.value})}
              // ref={nombreRef}
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
              onChange={(e)=> setFormData({...formData, pass: e.target.value})}
              // ref={passRef}
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

