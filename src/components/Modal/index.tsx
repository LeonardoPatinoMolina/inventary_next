import { Loot } from '@/components/Modal/hooks/useModal';
import React from 'react';
import styles from './style/Modal.module.scss';

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
        <div className={styles.wrapper}>
          <div className={`${styles.card} ${styles.modal}`}>
            <h2>{title}</h2>
            <p className={styles["modal-body"]}>{children}</p>
            <div className={styles.opctions}>
              <button className={`boton ${styles.btn} ${styles.green}`} onClick={() => confirmM(true)}>
                ACEPTAR</button>
              <button className={`boton ${styles.btn} ${styles.red}`} onClick={() => confirmM(false)}>
                CANCELAR</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};