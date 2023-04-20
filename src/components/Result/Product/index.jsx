//componets
import ReadProduct from './ReadProduct';
import ModProduct from './ModProduct';
//dependences
import { useSelector } from 'react-redux';

export default function Product({ toDelete, openDeleteModal }) {
  const { loginUser } = useSelector(state => state.login);

  //returns principales
    if (loginUser === 'visit') return <ReadProduct />;
    if (loginUser === 'admin') return <ModProduct openDeleteModal={openDeleteModal} toDelete={toDelete} />;
    if (loginUser === 'operador') return <ModProduct openDeleteModal={openDeleteModal} toDelete={toDelete} />;
}