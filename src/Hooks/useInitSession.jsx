import { useDispatch } from 'react-redux';
import { fetchOperators } from '../context/store/features/operatorsRedux';
import { fetchProducts } from '../context/store/features/productsRedux';
import { fetchRecords } from '../context/store/features/recordsRedux';
import { loginAdmin, loginOperator } from '../services/loginRequest';
import { addCookie, removeCookie } from '../utilities/Cookies';
import { init } from "../context/store/features/loginRedux";

export const useInitSession = () => {
  const dispatch = useDispatch();

  const verification = (data) => {
    const dataValues = Object.values(data);
    const verify = dataValues.filter(el => el !== '');
    if (verify.length === 2) return true;
    else return false;
  };

  async function logIn(sessionData) {
    console.log("log in");
    try {
      if (sessionData.user === "admin") {
        if (!verification(sessionData.data)) return {login: false, info: 'format'};
        const ingreso = await loginAdmin(sessionData.data);
        if(!ingreso) throw Error("Error en acceso: login");
        dispatch(init({
          loginUser: 'admin',
          idUser: ingreso.id,
          isLogin: true,
        }));
        addCookie(ingreso.session);
        sessionStorage.setItem("session_user", "admin");
        sessionStorage.setItem("session_id", "00");
        return {login: true, info: 'success'}
      }
      if (sessionData.user === "operador") {
        
        if (!verification(sessionData.data)) return {login: false, info: 'format'};
        const ingreso = await loginOperator(sessionData.data);
        if(!ingreso) throw Error("Error en acceso: login");
        dispatch(init({
          loginUser: 'operador',
          idUser: ingreso.id,
          isLogin: true,
        }));
        addCookie(ingreso.session);
        sessionStorage.setItem("session_user", "operador");
        sessionStorage.setItem("session_id", sessionData.id);
        return {login: true, info: 'success'}
      }
    } catch (error) {
      console.log(error);
      return {login: false, info: 'error'}
    }
  } //end loginInit

  function logOut() {
    try {
      console.log("log out");
      sessionStorage.removeItem("session_user")
      sessionStorage.removeItem("session_id")
      dispatch(init({
        loginUser: 'visit',
        idIUser: null,
        isLogin: false
      }));
      removeCookie();
    } catch (e) {
      console.log("Error: ", e);
    }
  }
  const initializeSession = () => {
    console.log("init");
    const s_user = sessionStorage.getItem("session_user");
    const s_id = sessionStorage.getItem("session_id");
    if (sessionStorage.getItem("session_user")) {
      if (s_id === "00") {
        //admin
        dispatch(init({
          loginUser: s_user,
          idUser: s_id === "00" ? "00" : s_id,
          isLogin: true,
        }));
      }
    }

    dispatch(fetchOperators());
    dispatch(fetchProducts());
    dispatch(fetchRecords());
  };//end init

  //variable booleana destinada a determinar el tipo formulario para la cuenta que fue logeada para posterior inicializacion, en caso de ser true, sabemos que fue un operador, caso contrario fue un administrador
  const session_id = sessionStorage.getItem("session_id");
  const checkForm = session_id !== "00" ? true : false;
  return {initializeSession, logIn, logOut, checkForm};
};
