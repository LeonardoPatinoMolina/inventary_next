import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { set_filterElection } from "../../context/store/features/filterRedux";

export default function FilterRecord({ setPlaceHolder }) {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(set_filterElection("default"));
  }, []);

  const hanldeFilterChange = (e) => {//cambia la lista del inout -AUTO-
    dispatch(set_filterElection(e.target.value));

    if (['fecha', 'operacion', 'operador'].includes(e.target.value)) {
      setPlaceHolder(e.target.value);
    }else setPlaceHolder("código");
  };

  return (
    <select
      name="filtros"
      onChange={hanldeFilterChange}
      className="search__filter"
      title='filtros'
    >
      <option
        value="default"
        className="search__filter-option">Código</option>
      <option
        value='fecha'
        className="search__filter-option">Fecha</option>
      <option
        value='operacion'
        className="search__filter-option">Operación</option>
      <option
        value='operador'
        className="search__filter-option">Operador</option>
    </select>
  );
}
