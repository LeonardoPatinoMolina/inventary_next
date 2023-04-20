//components
import DefaultResult from "../DefaultResult";
//dependences
// import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { setCodeProductSelected } from "../../../context/store/features/tempRedux";
import { useDispatch, useSelector } from "react-redux";

export default function ModProduct({ openDeleteModal, toDelete }) {
  const dispatch = useDispatch();
  const { productsFilter, chargeReady } = useSelector(
    (state) => state.products
  ); //datos filtrados para mostrar en vista
  const navigate = useNavigate();

  const handleClickRemove = (e) => {
    //maneja la remoción de productos obteniendo su código
    toDelete.current = {
      delete: "producto",
      codigo: e.target.parentElement.id,
    };
    openDeleteModal();
  };

  const handleEditarClick = (e) => {
    const idItem = e.target.parentElement.id;
    dispatch(setCodeProductSelected(idItem));
  };

  const clickHandleRes = (dato) => {
    sessionStorage.setItem("current_product", JSON.stringify(dato));
  };

  //returns condicionales principales
  //en caso de tener la base de datos vacía, renderice un resultado default
  if (productsFilter?.length < 1) return <DefaultResult not={"coincidencia"} />;
  if (chargeReady) {
    return productsFilter.map((dato) => {
      return (
        <div
          key={dato.pro_Codigo}
          title="producto"
          id={dato.pro_Codigo}
          className="result__item"
          onClick={() => clickHandleRes(dato)}
          onDoubleClick={() => navigate(`/consult/information/productos`)}
        >
          <p className="result__p">{dato.pro_Codigo}</p>
          <p className="result__p">{dato.pre_Nombre}</p>
          <p className="result__p">{dato.est_Estado}</p>
          <p className="result__p">{dato.col_Color}</p>
          <NavLink
            className={(isActive) =>
              isActive
                ? "select material-symbols-outlined"
                : "select material-symbols-outlined"
            }
            to="/operation/modifierProduct"
            onClick={handleEditarClick}
            title="editar producto"
          >
            edit
          </NavLink>
          <span
            onClick={handleClickRemove}
            title="remover producto"
            className="remove material-symbols-outlined"
          >
            delete
          </span>
        </div>
      );
    });
  }
  return <DefaultResult not={"datos"} />;
}
