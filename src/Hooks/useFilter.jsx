// import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { set_records_filter } from '../context/store/features/recordsRedux';
import { set_products_filter } from '../context/store/features/productsRedux';

export function useFilter() {
  const dispatch = useDispatch();
  const { filterElection } = useSelector(state => state.filter);
  const { products } = useSelector(state => state.products);
  const { records } = useSelector(state => state.records);
  const filterBy = (filtro, termino) => {
    // filtros de busqueda en campo de search_-----------------------------------------------------
    //PRODUCTOS**********************************************************
    const filterByCodidoP = (terminoBusqueda) => {//filtro default en productos
      let resultadosBusqueda = products.filter((elemento) => {
        if (elemento.pro_Codigo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
          return elemento;
        }else return null;
      });
      // setProductsFilter(resultadosBusqueda);
      dispatch(set_products_filter(resultadosBusqueda));
    };
    const filterByNombre = (terminoBusqueda)=>{//filtrar por nombre de producto
      let resultadosBusqueda = products.filter((elemento) => {
        if (elemento.pre_Nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
          return elemento;
        }else return null;
      });
      // setProductsFilter(resultadosBusqueda);
      dispatch(set_products_filter(resultadosBusqueda));

    };
    const filterByColor = (terminoBusqueda)=>{//filtrar por color de producto
      let resultadosBusqueda = products.filter((elemento) => {
        if (elemento.col_Color.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
          return elemento;
        }else return null;
      });
      // setProductsFilter(resultadosBusqueda);
      dispatch(set_products_filter(resultadosBusqueda));

    };
    const filterBySexo = (terminoBusqueda)=>{//filtrar por sexo de producto
      let resultadosBusqueda = products.filter((elemento) => {
        const sex = elemento.pro_Sexo === 'M' ? 'niño' : 'niña';
        if (sex.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
          return elemento;
        }else return null;
      });
      // setProductsFilter(resultadosBusqueda);
      dispatch(set_products_filter(resultadosBusqueda));
    };
    //REGISTROS**********************************************************
    const filterByCodidoR = (terminoBusqueda) => {//filtro default en registros
      let resultadosBusqueda = records.filter((elemento) => {
        if (elemento.pro_Codigo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
          return elemento;
        }else return null;
      });
      dispatch(set_records_filter(resultadosBusqueda));
    };
    const filterByFecha = (terminoBusqueda) => {//filtrar registro por fecha
      let resultadosBusqueda = records.filter((elemento) => {
        if (elemento.reg_Fecha.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
          return elemento;
        }else return null;
      });
      // setRecordsFilter(resultadosBusqueda);
      dispatch(set_records_filter(resultadosBusqueda));
    };
    const filterByOperacion = (terminoBusqueda) => {//filtrar registro por operacion
      let resultadosBusqueda = records.filter((elemento) => {
        if (elemento.opn_Operacion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
          return elemento;
        }else return null;
      });
      // setRecordsFilter(resultadosBusqueda);
      dispatch(set_records_filter(resultadosBusqueda));
    };
    const filterByOperador = (terminoBusqueda) => {//filtrar registro por operador
      let resultadosBusqueda = records.filter((elemento) => {
        if (elemento.ope_Nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())||elemento.ope_Apellido.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
          return elemento;
        }else return null;
      });
      // setRecordsFilter(resultadosBusqueda);
      dispatch(set_records_filter(resultadosBusqueda));
    };

    //*****************************************EJECUCIÓN***********
    if (filtro==='mercancia') {
      //PRODUCTOS
      if (filterElection === 'default') return filterByCodidoP(termino);
      if (filterElection === 'nombre') return filterByNombre(termino);
      if (filterElection === 'color') return filterByColor(termino);
      if (filterElection === 'sexo') return filterBySexo(termino);
    }else{
      //REGISTROS
      if (filterElection === 'default') return filterByCodidoR(termino);
      if (filterElection === 'fecha') return filterByFecha(termino);
      if (filterElection === 'operacion') return filterByOperacion(termino);
      if (filterElection === 'operador') return filterByOperador(termino);
    }
  }

return { filterBy };
}