import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { set_filterElection } from "../../context/store/features/filterRedux"; 

export default function FilterProduct({ setPlaceHolder }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(set_filterElection("default"));
  }, []);

  const handleFilterChange = (e) => {
    //cambia la lista de filtros en el inout -AUTO-
    dispatch(set_filterElection(e.target.value));

    if (["nombre", "color", "sexo"].includes(e.target.value)) {
      setPlaceHolder(e.target.value);
    } else setPlaceHolder("Código");
  };

  return (
    <select
      name="filtros"
      onChange={handleFilterChange}
      className="search__filter"
      title="filtros"
    >
      <option value="default" className="search__filter-option">
        Código
      </option>
      <option value="nombre" className="search__filter-option">
        Nombre
      </option>
      <option value="color" className="search__filter-option">
        Color
      </option>
      <option value="sexo" className="search__filter-option">
        Sexo
      </option>
    </select>
  );
}
