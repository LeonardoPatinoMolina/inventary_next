import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AccesoOperador, AccesoAdmin } from "../../services/accessRequest";
import { useVerifyReRender } from "../../Hooks/useVerifyReRender";
import { useInitSession } from "../../Hooks/useInitSession";
import Logo from "./../Logo";
import "./style/RouteProtected.css";

export const RouteProtected = ({ ToProtect, accessType = 'operator' }) => {
  const navigate = useNavigate();
  const {logOut} = useInitSession();
  const [verifyRe] = useVerifyReRender();
  const [isLoading, setisLoading] = useState(true);
  const fetchCall = useCallback(async () => {
    if (isLoading) {
      let res
      if(accessType === 'operator') res = await AccesoOperador();
      if(accessType === 'admin') res = await AccesoAdmin();
      
      if (!res.login) {
        if(res.info === "fetch" || res.info === "problema con el token"){
          if (!verifyRe()){    
            alert("usted no cuenta con autorización para visitar esta ventana");
            }
            navigate("/");
        }
        if(res.info === "sessionExp"){
          if (!verifyRe()){
            alert("La sessión a expirado, inicie sesión nuevamente.");
            logOut();
          }
          navigate("/");
        }else{}
      } else setisLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCall();
  }, []);

  return isLoading ? <Waithing /> : <ToProtect />;
};
const Waithing = () => {
  return (
    <div className="home back-default">
      <div className="RouteProtected__message_container">
        <p className={"RouteProtected__message"}>
          Cargando
          <span className={"RouteProtected__load_point_1"}>.</span>
          <span className={"RouteProtected__load_point_2"}>.</span>
          <span className={"RouteProtected__load_point_3"}>.</span>
        </p>
      </div>
      <div className="RouteProtected__container_logo">
        <Logo clase={"RouteProtected__logo"} />
      </div>
    </div>
  );
};
