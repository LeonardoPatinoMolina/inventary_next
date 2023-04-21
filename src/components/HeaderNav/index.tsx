"use client"
import React, { Ref, useRef, useState } from "react";
//estilos
import styles from "./style/HeaderNav.module.scss";
//components
import { Logo } from "../Logo";
//dependences
import Link from 'next/link';
import { useAdminConfiguration } from "../../Hooks/useAdminConfiguration";
import { useOutsideClick } from "../../Hooks/useOutsideClick";
import { Modal } from "../Modal";
import { useModal } from "../../Hooks/useModal";
import { useAppSelector } from "@/context/reduxHooks";

export const HeaderNav: React.FC = () => {
  const refClick1 = useRef<EventTarget>();
  const refClick2 = useRef<EventTarget>();
  const refClick3 = useRef<EventTarget>();

  useOutsideClick(showListAdmin, [refClick1, refClick2, refClick3]);

  const { loginUser } = useAppSelector(state=>state.login); //usuario logeado o visitante
  const [loot, openModal, closeModal] = useModal({isOpen: false});
  const configAdmin = useAdminConfiguration({openModal, closeModal});
  
  function hideListAdmin() {
    const option1 = refClick1.current as HTMLElement;
    const option2 = refClick2.current as HTMLElement;
    const option3 = refClick3.current as HTMLElement;
    option1?.classList.remove("open-admin");
    option2?.classList.remove("open-admin");
    option3?.classList.remove("open-admin");
  };
  
  const [tim, setTim] = useState(setTimeout(()=> hideListAdmin(), 1));

  function showListAdmin() {
    const option1 = refClick1.current as HTMLElement;
    const option2 = refClick2.current as HTMLElement;
    const option3 = refClick3.current as HTMLElement;
    option1!.classList.toggle("open-admin");
    option2!.classList.toggle("open-admin");
    option3!.classList.toggle("open-admin");
    
    clearTimeout(tim);
    setTim(()=>setTimeout(()=> hideListAdmin(), 2700))
  };


  const handleConfig = () => {
    hideListAdmin();
    configAdmin();
  };

  return (
    <>
    <Modal title="lorem" confirmM={closeModal} loot={loot}>
      lorem
    </Modal>
      <nav className={styles.navegation}>
        <ul className={styles.navegation__options}>
          <li className={styles.navegation__item}>
            <Link className={styles.navegation__anchor} href={"/"}>
              <Logo clase={styles.navegation__icon} />
            </Link>
          </li>
          <li className={styles.navegation__item}>
            <Link className={styles.navegation__anchor} href="/consult/product">
              CONSULTAR<div className={styles["search-icon"]}></div>
            </Link>
          </li>
          <li id="selectAdmin" className={styles.navegation__item}>
            {loginUser === "admin" ? (
              <div className={styles.navegation__anchor} onClick={showListAdmin}>
                ADMINISTRAR
              </div>
            ) : (
              <div className={`${styles.navegation__anchor} inactive`}>ADMINISTRAR</div>
            )}
            <Link
              id="admoption1"
              className={`${styles["navegation__sub-op"]} ${styles["navegation__deploy-admin"]} ${styles.deploy1}`}
              href="/administration/operators"
              onClick={hideListAdmin}
              ref={refClick1 as Ref<HTMLAnchorElement>}
            >
              OPERADORES
            </Link>
            <Link
              id="admoption2"
              className={`${styles["navegation__sub-op"]} ${styles["navegation__deploy-admin"]} ${styles.deploy2}`}
              href="/administration/consultRecord"
              onClick={hideListAdmin}
              ref={refClick2 as Ref<HTMLAnchorElement>}
            >
              CONSULTAR REGISTRO
            </Link>
            <div
              id="admoption3"
              className={`${styles["navegation__sub-op"]} ${styles["navegation__deploy-admin"]} ${styles.deploy3}`}
              onClick={handleConfig}
              ref={refClick3 as Ref<HTMLDivElement>}
            >
              CONFIGURACIÓN
              <span className="material-symbols-outlined">settings</span>
            </div>
          </li>
          <li className={styles.navegation__item}>
            <Link className={styles.navegation__anchor} href={"/account"}>
              CUENTA
            </Link>
          </li>
          <li className={styles.navegation__item}>
            <Link className={styles.navegation__anchor} href={"/help"}>
              AYUDA
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
