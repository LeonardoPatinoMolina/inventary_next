export default function DefaultResult({ not }) {
  return (
    <div className="not-data">
      {not === 'coincidencia' ? 'NO HAY COINCIDENCIAS' : 'ENCONTRANDO DATOS...'}
    </div>
  );
}