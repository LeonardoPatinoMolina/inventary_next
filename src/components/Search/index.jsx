import './style/Search.css';
import FilterProduct from './FilterProduct';
import FilterRecord from './FilterRecord';
//dependences
import { useState, useRef } from 'react';
import { useFilter } from '../../Hooks/useFilter';
import { Link } from "react-router-dom";
import { fetchProducts } from '../../context/store/features/productsRedux';
import { fetchRecords } from '../../context/store/features/recordsRedux';
import { useSelector, useDispatch } from 'react-redux';

export default function Search({ filtro, isRecord }) {

  const busqueda = useRef();
  const dispatch = useDispatch();
  const { loginUser } = useSelector(state => state.login);
  const [placeHolder, setPlaceHolder] = useState('código');
  const { filterBy } = useFilter();

  const handleChange = e => {
    e.preventDefault();
    busqueda.current = e.target.value;
    filterBy(filtro, e.target.value);
  }

  const refreshHandle = () => {
    if(isRecord) {
      dispatch(fetchRecords());
    }
    else{
      dispatch(fetchProducts());
      }
  };

  return (
    <>
      <div
        className="search__form"
        id='form_search'
      >
        <input
          type="search"
          className="search__text-field"
          placeholder={'Ingrese  ' + placeHolder}
          onChange={handleChange}
        />
        <button
          title='buscar'
          className="search__button"
          form="form_serch"
        >
          <div className="search-icon"></div>
        </button>
        {(filtro === 'mercancia') ? <FilterProduct setPlaceHolder={setPlaceHolder} /> : <FilterRecord setPlaceHolder={setPlaceHolder} />}
        <button
          className='boton search__refresh'
          onClick={()=>refreshHandle()}
          title='refrescar'
        >
          <span className="material-symbols-outlined">
            refresh
          </span>
        </button>
        {(loginUser === 'operador') || ((loginUser === 'admin') && !isRecord)
          ?
          <Link
            className="boton-add boton"
            to='/operation/registerProduct'
          >
            Nuevo
            <span className="material-symbols-outlined">add</span>
          </Link>
          :
          ''
        }
      </div>
    </>
  );
}