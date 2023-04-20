import React from 'react';
import './style/Modal.module.scss';
import { Loot } from '@/Hooks/useModal';

// export interface ModalProps {
//   title: string; 
//   children: React.ReactNode;
//   action: any;
//   closeModal: any; 
//   isOpen: boolean; 
//   modalType: string;
// }

// export const Modal: React.FC<ModalProps> = ({ title, children, action, closeModal, isOpen, modalType }) => {

//   const renderTypeAlert = () => {
//     if (modalType === 'aviso') {
//       return (
//         <button
//           className="boton"
//           onClick={() => closeModal()}
//         >ACEPTAR</button>
//       );
//     }
//     if (modalType === 'confirmacion') {
//       return (
//         <>
//           <button
//             className="boton"
//             onClick={() => action()}
//           >ACEPTAR</button>
//           <button
//             className="cancel-btn"
//             onClick={() => closeModal()}
//           >CANCELAR</button>
//         </>
//       );
//     }
//     if (modalType === 'espera') return;
//     setTimeout(() => closeModal(), 1500);
//   };
//   return (
//     <div className={`modal ${isOpen ? 'is-open' : ''}`}>
//       <div className="modal__container bounce-a">
//         <h3 className='modal__title'>
//           <span className="material-symbols-outlined">
//             info
//           </span> 
//           {title}</h3>
//         <p className='modal__message'>{children}</p>
//         {renderTypeAlert()}
//       </div>
//     </div>
//   );
// }

interface ModalProps{
  loot: Loot;
  title: string;
  confirmM: (choice: any)=>void;
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ loot, title, children, confirmM }) => {
  return (
    <>
      {loot.isOpen && (
        <div className="wrapper">
          <div className="card modal">
            <h2>{title}</h2>
            <p className="modal-body">{children}</p>
            <div>
              <button className="btn green" onClick={() => confirmM(true)}>
                ACEPTAR</button>
              <button className="btn red" onClick={() => confirmM(false)}>
                CANCELAR</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};