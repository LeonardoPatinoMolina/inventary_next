//compoennets
import DefaultResult from "./DefaultResult";
//dependences
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Record() {
  const { recordsFilter, chargeReady } = useSelector((state) => state.records);

  const clickHandleRes = (dato) => {
    sessionStorage.setItem("current_record", JSON.stringify(dato));
  };

  if (recordsFilter.length < 1) {
    return <DefaultResult not={"coincidencia"} />;
  }
  if (chargeReady) {
    return recordsFilter.map((dato) => {
      return (
        <NavLink
          key={dato.reg_Id}
          title="registro"
          className={(isActive) => (isActive ? "result__item" : "result__item")}
          onClick={() => clickHandleRes(dato)}
          to={`/consult/information/registro`}
        >
          <p>{dato.reg_Fecha}</p>
          <p>{dato.reg_Hora}</p>
          <p>{dato.opn_Operacion}</p>
          <p>{dato.pro_Codigo}</p>
          <p>{dato.ope_Nombre}</p>
          <p>{"(...)"}</p>
        </NavLink>
      );
    });
  }
  return <DefaultResult not={"datos"} />;
}
