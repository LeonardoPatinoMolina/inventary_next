//components
import DefaultResult from "../DefaultResult";
//dependences
import { NavLink } from "react-router-dom";
// import { useContext, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setIdUserSelected } from "../../../context/store/features/tempRedux";

export default function Operator({ openDeleteModal, toDelete }) {
  const {operators, chargeReady} = useSelector(state => state.operators);
  const dispatch = useDispatch();

  const handleRemove = (e) => {
    //maneja la remoción de operadores obteniendo su id
    toDelete.current = { delete: "operador", id: e.target.parentElement.id };
    openDeleteModal();
  };

  const handleEditarClick = (e, dato) => {
    //obtiene el id del operador a editar
    const idItem = e.target.parentElement.id;
    dispatch(setIdUserSelected(idItem));
    sessionStorage.setItem("current_operator", JSON.stringify(dato))
  };

    if (operators?.length < 1) return <DefaultResult not={"coincidencia"} />;
    if (chargeReady) {
      return operators.map((dato) => {
        return (
          <div
            key={dato.ope_Id}
            title="operador"
            id={dato.ope_Id}
            className="result__item"
          >
            <p className="result__p">{dato.ope_Id}</p>
            <p className="result__p">{dato.ope_Nombre}</p>
            <p className="result__p">{dato.ope_Cedula}</p>
            <p className="result__p">{dato.ope_Credencial}</p>
            <NavLink
              className={(isActive) =>
                isActive
                  ? "select material-symbols-outlined"
                  : "select material-symbols-outlined"
              }
              to="/administration/operatorModifier"
              onClick={(e) => handleEditarClick(e, dato)}
            >
              edit
            </NavLink>
            <span
              className="remove material-symbols-outlined"
              onClick={handleRemove}
            >
              delete
            </span>
          </div>
        );
      });
    }
  return <DefaultResult not={"datos"} />;
}
