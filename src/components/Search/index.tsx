import { useAppDispatch, useAppSelector } from '@/context/reduxHooks';
import { set_query } from '@/context/store/features/searchRedux';
import Link from 'next/link';
import { useState } from 'react';
import { Filters } from './Filters';

export interface SearchProps {
  filter: "product" | "record";
  fetchQuery: ()=>void;
  fetchRefresh: ()=>void;
}

const FILTERS: any = {
  product: ["color","sexo","nombre"],
  record: ['fecha', 'operacion', 'operador'],
}

export const Search: React.FC<SearchProps> = ({ filter, fetchQuery, fetchRefresh }) => {

  const searchState = useAppSelector(state=>state.search)
  const dispatch = useAppDispatch();
  const [placeHolder, setPlaceHolder] = useState<string>('código');

  const handleChange = (e: any) => {
    e.preventDefault();
    dispatch(set_query({query: e.target.value}));
  }
  
  const refreshHandle = () => {
    fetchRefresh();
  };
  
  const handleSubmit = (e: React.FormEvent)=>{
    e.preventDefault(); 
    fetchQuery();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={'search__form'}
        id='form_search'
      >
        <input
          type="search"
          className={"search__text-field"}
          placeholder={'Ingrese  ' + placeHolder}
          onChange={handleChange}
          value={searchState.query}
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
        href='/register/product'
        style={{color: '#fff',fontWeight: 'bolder'}}
      >
        <span className="material-symbols-outlined">add</span>
      </Link>
    </>
  );
}