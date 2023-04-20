import './style/Login.css';
import Usuario from './Usuario';
import Admin from './Admin';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useInitSession } from '../../Hooks/useInitSession'
import { removeCookie } from '../../utilities/Cookies';

export default function Login() {//contexto 2

  const { isLogin } = useSelector(state => state.login);

  const {logOut, checkForm} = useInitSession();
  const [toLog, setToLog] = useState(checkForm);//valida si la vista es para ingreso de operador o administrador
  const navigate = useNavigate();
  
  const switchForm = () => {//click al boton para cambiar vista de ingreso
    setToLog(!toLog);
  };

  const clickSalirHandler = () => {//deslogea al usuario
    logOut();
    navigate('/');
  };

  const SwitchFormBoton = () => {
    return (
      <button
        className="boton"
        onClick={switchForm}
      >
        Ingresar como {toLog ? 'administrador' : 'operador'}
      </button>
    );
  };

  const BotonSalir = () => {//renderiza el boton salir cuando ya hay login
    return (
      <>
        <h2>{toLog ? 'Operador' : 'Administrador'}</h2>
        <button
          className='boton logout'
          onClick={clickSalirHandler}
        >Salir
          <span className="material-symbols-outlined">
            logout
          </span>
        </button>
      </>
    );
  };

  return (
    <div className={`login ${toLog ? 'back-user' : 'back-admin'}`}>
      <div className="login__content back-default">
        {isLogin ? '' : (toLog ? <Usuario /> : <Admin />)}
        <img
          className="login__logo"
          src={require(`../../images/${isLogin ? (toLog ? 'user' : 'admin') : 'visit'}Logo.webp`)}
          alt="logotipo"
        />
        {isLogin ? <BotonSalir /> : <SwitchFormBoton />}
      </div>
    </div>
  );
}