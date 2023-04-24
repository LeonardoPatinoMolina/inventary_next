import React from 'react';
import { useDispatch } from 'react-redux';
import { set_filter } from '@/context/store/features/searchRedux';
export interface FilterProps {
  setPlaceHolder: any,
  options: string[]
}
export const Filters: React.FC<FilterProps> = ({ setPlaceHolder, options }) => {
  const dispatch = useDispatch();

  const handleFilterChange = (e: any) => {
    //cambia la lista de filtros en el inout -AUTO-
    // dispatch(set_filterElection(e.target.value));
    if (options.includes(e.target.value)) {
      dispatch(set_filter({filter: e.target.value}));
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
      {options.map((op,i)=>{
        return (
          <option value={op} className="search__filter-option" key={`option-filter-${i}`}>
            {op[0].toUpperCase() + op.slice(1,op.length)}
          </option>
        )
      })}
    </select>
  );
}
