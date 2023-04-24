"use client"
import React, { Ref, useRef } from "react";
import { Logo } from "./Logo";
import { useOutsideClick } from "@/Hooks/useOutsideClick";
import { useAdminConfiguration } from "@/Hooks/useAdminConfiguration";
import { useDropDown } from "@/Hooks/useDropDown";
import { useModal } from "@/Hooks/useModal";
import { useAppSelector } from "@/context/reduxHooks";
import Link from 'next/link';
import { Modal } from "./Modal";

export const HeaderNav: React.FC = () => {
  const refClick1 = useRef<EventTarget>();
  const refClick2 = useRef<EventTarget>();

  const dDown1 = useDropDown();
  const dDown2 = useDropDown();
  useOutsideClick(dDown1.close, [refClick1]);
  useOutsideClick(dDown2.close, [refClick2]);

  const { active } = useAppSelector(state=>state.headernav);
  const [loot, openModal, closeModal] = useModal({isOpen: false});
  const configAdmin = useAdminConfiguration({openModal, closeModal});

  // const handleConfig = () =>  {
  //   hideListAdmin();
  //   configAdmin();
  // };

  return (
    <>
    <Modal title="lorem" confirmM={closeModal} loot={loot}>
      lorem
    </Modal>
      <nav className={'navegation'}>
        <ul className={'navegation__options'}>
          <li className={'navegation__options__item'} data-name="icon">
            <Link className={'navegation__options__item__anchor'} href={"/"}>
              <Logo clase={'navegation__icon'} />
            </Link>
          </li>
          <li className={'navegation__options__item'} data-name="consult">
            <div 
              className={`${'navegation__options__item__anchor'} ${active === "consult" && "navegation__options__item__anchor--active"}`} 
              onClick={()=>{dDown2.open()}}
            >
              CONSULTAR
            </div>
            <div className={`navegation__drop_down ${dDown2.animateClass}`} ref={refClick2 as Ref<HTMLDivElement>}>
            <Link
              className={`navegation__drop_down__option`}
              href="/consult/product"
            >
              Productos
            </Link>
            <Link
              className={`navegation__drop_down__option`}
              href="#"
            >
              Actividad
            </Link>
            </div>
          </li>
          <li className={'navegation__options__item'} data-name="admin">
            <div 
              className={`navegation__options__item__anchor ${active === "admin" && "navegation__options__item__anchor--active"}`} 
              onClick={()=>{dDown1.open()}}
            >
              ADMINISTRAR
            </div>
            <div className={`navegation__drop_down ${dDown1.animateClass}`} ref={refClick1 as Ref<HTMLDivElement>}>
              <Link
                className={`navegation__drop_down__option`}
                href="/prueva"
              >
                Operadores
              </Link>
              <div
                className={`navegation__drop_down__option`}
              >
                Configuración
                <span className="material-symbols-outlined">settings</span>
              </div>
            </div>
          </li>
          <li className={'navegation__options__item'} data-name="account">
            <Link  className={`navegation__options__item__anchor ${active === "account" && "navegation__options__item__anchor--active"}`} href={"#"}>
              CUENTA
            </Link>
          </li>
          <li className={'navegation__options__item'} data-name="help">
            <Link
              className={`navegation__options__item__anchor ${active === "help" && "navegation__options__item__anchor--active"}`}
              href={"#"}
            >
              AYUDA
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}