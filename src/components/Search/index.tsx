import { useState } from 'react';
import Link from 'next/link'
import { Filters } from './Filters';
import { useAppDispatch, useAppSelector } from '@/context/reduxHooks';
import { set_query } from '@/context/store/features/searchRedux';

export interface SearchProps {
  filter: "product" | "record";
  searchCallback: ()=>void;
}

const FILTERS: any = {
  product: ["color","sexo","nombre"],
  record: ['fecha', 'operacion', 'operador'],
}

export const Search: React.FC<SearchProps> = ({ filter, searchCallback }) => {

  const {query} = useAppSelector(state=>state.search)
  const dispatch = useAppDispatch();
  const [placeHolder, setPlaceHolder] = useState<"código"|"cédula">('código');

  const handleChange = (e: any) => {
    e.preventDefault();
    dispatch(set_query({query: e.target.value}))
  }

  const refreshHandle = () => {
    searchCallback();
  };

  return (
    <>
      <form
        onSubmit={(e)=>{e.preventDefault(); searchCallback()}}
        className={'search__form'}
        id='form_search'
      >
        <input
          type="search"
          className={"search__text-field"}
          placeholder={'Ingrese  ' + placeHolder}
          onChange={handleChange}
          value={query}
        />
        <button
          title='buscar'
          className={'search__button'}
          form="form_search"
          type='submit'
        >
          <span className="material-symbols-outlined">
            search
          </span>
        </button>
        <Filters setPlaceHolder={setPlaceHolder} options={FILTERS[filter]} />
        <button
          className={`boton search__refresh`}
          onClick={()=>refreshHandle()}
          title='refrescar'
          type='button'
        >
          <span className="material-symbols-outlined">
            refresh
          </span>
        </button>
      </form>
      <Link
        title="añadir nuevo producto"
        className={`search__add`}
        href='#'
      style={{color: '#fff',fontWeight: 'bolder'}}
      >
        <span className="material-symbols-outlined">add</span>
      </Link>
    </>
  );
}