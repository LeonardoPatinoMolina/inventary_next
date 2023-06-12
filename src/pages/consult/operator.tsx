import Link from 'next/link';
import { useEffect } from 'react';
import { PageLayout } from '../../components/PageLayout';
import { ResultBox } from '../../components/ResultBox';
import { useGetOperatorsQuery } from '../../context/api/apiOperators';
import { useAppDispatch } from '../../context/reduxHooks';
import { setActive } from '../../context/store/features/headernav';

export default function Operator() {
  const dispatch = useAppDispatch();
  const {isLoading, data, refetch,isError, isSuccess} = useGetOperatorsQuery(0);

  useEffect(() => {
    dispatch(setActive({ active: "admin" }));
  }, []);

  return (
    <PageLayout title='Consultar operador' desc="obtenga información sobre el operador de su interés">
    <main className='operators back-operator'>
      <ul className='operators__list-options'>
        <li className='operators__list-options__item'>
          <button
            className='boton operators__refresh'
            onClick={()=>{refetch()}}
            title='refrescar'
          >
            <span className="material-symbols-outlined">
              refresh
            </span>
          </button>
        </li>
        <li className='operators__list-options__item'>
          <Link
            className="boton-add-operator boton"
            href='/register/operator'
          >
            Registrar Operador
            <span className="material-symbols-outlined">add</span>
          </Link>
        </li>
      </ul>
      <ResultBox data={data}>
        {(isSuccess && !isLoading) ? data.data.map((ope: any)=>(
          <tr
          key={ope.id}
          title="producto"
          id={ope.id}
          className="resultbox__item"
          onClick={() => {}}
          onDoubleClick={() => {}}
        >
          <td className="resultbox__p">{ope.id}</td>
           <td className="resultbox__p">{ope.nombre}</td>
          <td className="resultbox__p">{ope.apellido}</td>
          <td className="resultbox__p">{ope.cedula}</td>
          <td className="resultbox__p">{ope.credential}</td>
          <td className="resultbox__p">
            <Link href={`/edit/operator/${ope.id}`} title="editar operador">
              <span
                title="editar operador"
                className="boton material-symbols-outlined"
              >
                edit
              </span>
            </Link>
            <span
              title="remover producto"
              className="delete-btn material-symbols-outlined"
            >
              delete
            </span>
          </td>
        </tr>
        )) 
        : <tr className="resultbox__item"><td className="resultbox__p">loading...</td></tr>}
      </ResultBox>
    </main>
  </PageLayout>
  );
}