import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import DefaultResult from "../DefaultResult";

export default function ReadProduct() {
  //contexto

  const { productsFilter, chargeReady } = useSelector(
    (state) => state.products
  );

  const clickHandleRes = (dato) => {
    sessionStorage.setItem("current_product", JSON.stringify(dato));
  };

  if (productsFilter?.length < 1) return <DefaultResult not={"coincidencia"} />;
  if (chargeReady) {
    return productsFilter.map((dato) => {
      //pseudo-resultados
      return (
        <NavLink
          key={dato.pro_Codigo}
          title="producto"
          className={(isActive) => (isActive ? "result__item" : "result__item")}
          onClick={() => clickHandleRes(dato)}
          to={`/consult/information/productos`}
        >
          <p className="result__p">{dato.pro_Codigo}</p>
          <p className="result__p">{dato.pre_Nombre}</p>
          <p className="result__p">{dato.est_Estado}</p>
          <p className="result__p">{dato.col_Color}</p>
          <p className="result__p">{dato.pro_Talla}</p>
          <p className="result__p">(...)</p>
        </NavLink>
      );
    });
  }
  return <DefaultResult not={"datos"} />;
}
