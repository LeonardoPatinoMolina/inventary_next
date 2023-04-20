import { useSelector } from 'react-redux';

export default function ResultHead({ printResultMarc, tipoResultado }) {

  const { loginUser } = useSelector(state => state.login);

  if (tipoResultado === 'productos') {
      return (
      <div className="search__result-head" >
        <p className='search__p'><b>CÓDIGO</b></p>
        <p className='search__p'><b>NOMBRE</b></p>
        <p className='search__p'><b>ESTADO</b></p>
        <p className='search__p'><b>COLOR</b></p>
        {loginUser === 'visit' 
          ? (<p className='search__p'><b>TALLA</b></p>)
          : (<p className='search__p'><b>OPERADOR</b></p>)
        }
        <p className='search__p'><b>Resultados: {printResultMarc()}</b></p>
      </div >);
  }
  if (tipoResultado === 'registros') return (
    <div className="search__result-head">
      <p className='search__p'><b>FECHA </b></p>
      <p className='search__p'><b>HORA</b></p>
      <p className='search__p'><b>OPERACIÓN</b></p>
      <p className='search__p'><b>PRODUCTO Cod.</b></p>
      <p className='search__p'><b>OPERADOR</b></p>
      <p className='search__p'><b>Resultados: {printResultMarc()}</b></p>
    </div>
  );
  if (tipoResultado === 'operadores') return (
    <div className="search__result-head">
      <p className='search__p'><b>ID</b></p>
      <p className='search__p'><b>NOMBRE</b></p>
      <p className='search__p'><b>CEDULA</b></p>
      <p className='search__p'><b>CREDENCIAL</b></p>
      <p className='search__p'><b>(...)</b></p>
      <p className='search__p'><b>Resultados: {printResultMarc()}</b></p>
    </div>
  );

}