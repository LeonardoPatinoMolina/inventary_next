import './style/Result.css';
//components
import Operator from './Operator';
import Record from './Record';
import Product from './Product';
import Modal from '../Modal';
import ResultHead from './ResultHead';
//dependences
import { useRef } from 'react';
import { useModal } from '../../Hooks/useModal';
import { useSelector, useDispatch } from 'react-redux';
import {fetchProducts} from '../../context/store/features/productsRedux'
import {fetchOperators} from '../../context/store/features/operatorsRedux'
import { eliminarOperador, eliminarProducto } from '../../services/modificacionRequest';

export default function Result({ tipoResultado }) {

  const dispatch = useDispatch();
  const [modalDeleteIsOpen, openDeleteModal, closeDeleteModal] = useModal(false);
  const [
    isOpenResponseSuccess,
    openModalResponseSuccess,
    closeModalResponseSuccess,
  ] = useModal(false);
  const [isOpenResponseError, openModalResponseError, closeModalResponseError] =
    useModal(false);
  
  const toDelete = useRef({}); //referencia para los datos de elemento a eliminar, será pasada a componentes especializados
  const { idUser }=useSelector(state => state.login);
  const {  productsFilter }=useSelector(state => state.products);
  const { recordsFilter }=useSelector(state => state.records);
  const { operators }=useSelector(state => state.operators);

  const printResultMarc = () => {//imprime la cantidad de resultados consultados
    if (tipoResultado === 'productos') return productsFilter.length;
    if (tipoResultado === 'registros') return recordsFilter.length;
    if (tipoResultado === 'operadores') return operators.length;
  };

  const deleteElemento = async (data) => {
    try {
      let envioData;
      if (data.delete === 'producto') envioData = await eliminarProducto(data);
      if (data.delete === 'operador') envioData = await eliminarOperador(data);
      if (!envioData.success) {
        openModalResponseError();
        return false;
      }
      openModalResponseSuccess();
      if(data.delete === 'producto'){
         dispatch(fetchProducts());
         console.log('a ver');
        }
      if(data.delete === 'operador') {
        dispatch(fetchOperators());
      }
      return true;
    } catch (error) { console.log(error); }
  };

  const deleteConfirm = () => {
    let data = {};
    if (toDelete.current.delete === 'producto') {
      data = {
        delete: toDelete.current.delete,
        codigo: toDelete.current.codigo,
        userId: idUser,
      }
    }
    if (toDelete.current.delete === 'operador') {
      data = {
        delete: toDelete.current.delete,
        id: toDelete.current.id,
        userId: idUser,
      }
    }
    deleteElemento(data);
    closeDeleteModal();
  };

  return (
    <>
      <Modal
        title='PRECAUCIÓN'
        modalType='confirmacion'
        action={deleteConfirm}
        isOpen={modalDeleteIsOpen}
        closeModal={closeDeleteModal}
      >
        Está por remover el presente elemento, ¿desea continuar?
      </Modal>
      <Modal
        title="RESPUESTA"
        modalType="aviso"
        isOpen={isOpenResponseSuccess}
        closeModal={closeModalResponseSuccess}
      >
        Tarea realizada exitosamente.
      </Modal>
      <Modal
        title="ERROR"
        modalType="aviso"
        isOpen={isOpenResponseError}
        closeModal={closeModalResponseError}
      >
        La tarea a fallado, verifique su conexión e intente más tarde.
      </Modal>
      <ResultHead
        printResultMarc={printResultMarc}
        tipoResultado={tipoResultado}
      />
      <div className="result" >
        {(tipoResultado === 'productos') &&
          <Product
            openDeleteModal={openDeleteModal}
            toDelete={toDelete}
          />}
        {(tipoResultado === 'registros') && <Record />}
        {(tipoResultado === 'operadores') &&
          <Operator
            openDeleteModal={openDeleteModal}
            toDelete={toDelete}
          />}
      </div>
    </>
  );
}
