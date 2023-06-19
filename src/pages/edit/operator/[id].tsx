import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState } from "react";
import { Modal } from "../../../components/Modal";
import { useModal } from '../../../components/Modal/hooks/useModal';
import { PageLayout } from "../../../components/PageLayout";

interface formData {
    cedula: string,
    credencial: string,
    nombre: string,
    apellido: string,
    password: string,
}

export default function OperatorRegister({data}:  InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  
  const ID = router.query.id;
  const [formData, setFormData] = useState<formData>(data);
  const [isOpenAviso, openModalAviso, closeModalAviso] = useModal({isOpen: false});
  const [
    isOpenResponseSuccess,
    openModalResponseSuccess,
    closeModalResponseSuccess,
  ] = useModal({isOpen: false});
  const [isOpenResponseError, openModalResponseError, closeModalResponseError] =
    useModal({isOpen: false});
  const [
    isOpenResponseWarning,
    openModalResponseWarning,
    closeModalResponseWarning,
  ] = useModal({isOpen: false});

  const verification = () => {
    const exp1 = /[\^!¡¿?$#&/().=-`´°|<>*;\\,{}]/g;
    let v: any[] = [];
    const values = Object.values(formData);
    values.forEach((val: any) => v.push(exp1.exec(val)));
    const validator = v.filter((aja) => aja !== null);
    return validator.length === 0;
  };

  const clickHandler = async (e: any) => {
    e.preventDefault();
    e.target.setAttribute("disabled", "");

    if (!verification()) {
      e.target.removeAttribute("disabled");
      return openModalResponseWarning();
    }
    // try {
    //   openModalAviso();
    //   const envioData = await registrarOperador(formData);
    //   closeModalAviso();
    //   if (!envioData.success) {
    //     e.target.removeAttribute("disabled");
    //     return openModalResponseError();
    //   }
    //   openModalResponseSuccess();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const closeModalResponseSuccess2 = () => {
    // funcion encargada de cerrar modal exitoso y salirse de la ventana
    // closeModalResponseSuccess();
    router.push("/consult/operator");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };
  return (
    <PageLayout title="Registrar operador" desc="Registre los datos de un nuevo operador">
      <Modal title="AVISO"  loot={isOpenAviso} confirmM={closeModalAviso}>
        Por favor espere mientras validamos la información...
      </Modal>
      <Modal
        title="RESPUESTA"
        loot={isOpenResponseSuccess}
        confirmM={closeModalResponseSuccess2}
      >
        Tarea realizada exitosamente.
      </Modal>
      <Modal
        title="RESPUESTA"
        loot={isOpenResponseWarning}
        confirmM={closeModalResponseWarning}
      >
        La tarea a fallado,  los siguientes cracteres no están permitidos:{" "}
        <br />
        ^!¡¿?$#&/{`()`}.=`°|,*;\{`<>`}
        <br />
        Si esta observasión no es útil, pruebe reescribiendo los campos.
      </Modal>
      <Modal
        title="ERROR"
        loot={isOpenResponseError}
        confirmM={closeModalResponseError}
      >
        La tarea a fallado, verifique su conexión e intente más tarde.
      </Modal>
      <div className="operator-register back-operator">
        <h2 className='operator-register__title'>EDITAR OPERADOR</h2>
        <Link href="/consult/operator" className="boton operator-register__return">
          Volver
          <span
            className="material-symbols-outlined"
            title="volver"
          >
            keyboard_return
          </span>
        </Link>
        <form className="operator-register__form" onSubmit={clickHandler}>
          <ul className="operator-register__form-list">
            <li className="operator-register__form-list__item">
              <label
                htmlFor="operator-register__nombre"
                className="operator-register__label"
              >
                Nombre
              </label>
              <input
                type="text"
                id="operator-register__nombre"
                className="operator-register__field"
                placeholder="Ingrese un nombre"
                value={formData?.nombre}
                name="nombre"
                onChange={(e) => handleChange(e)}
                required
              />
            </li>
            <li className="operator-register__form-list__item">
              <label
                htmlFor="operator-register__apellido"
                className="operator-register__label"
              >
                Apellido
              </label>
              <input
                type="text"
                id="operator-register__apellido"
                className="operator-register__field"
                placeholder="Ingrese un apellido"
                value={formData?.apellido}
                name="apellido"
                onChange={(e) => handleChange(e)}
                required
              />
            </li>
            <li className="operator-register__form-list__item">
              <label
                htmlFor="operator-register__cedula"
                className="operator-register__label"
              >
                Cédula
              </label>
              <input
                type="number"
                id="operator-register__cedula"
                className="operator-register__field"
                placeholder="Ingrese una Cedula"
                value={formData?.cedula}
                name="cedula"
                onChange={(e) => handleChange(e)}
                required
              />
            </li>
            <li className="operator-register__form-list__item">
              <label
                htmlFor="operator-register__credencial"
                className="operator-register__label"
              >
                Credencial
              </label>
              <input
                type="text"
                id="operator-register__credencial"
                className="operator-register__field"
                placeholder="Ingrese una credencial"
                value={formData?.credencial}
                name="credencial"
                onChange={(e) => handleChange(e)}
                required
              />
            </li>
            <li className="operator-register__form-list__item">
              <label
                htmlFor="operator-register__password"
                className="operator-register__label"
              >
                Contraseña
              </label>
              <input
                type="text"
                id="operator-register__password"
                className="operator-register__field"
                placeholder="Ingrese una contraseña"
                value={formData?.password}
                name="password"
                onChange={(e) => handleChange(e)}
                required
              />
            </li>
            <li className="operator-register__form-list__item">
              <button className="operator-register__submit boton">
                Confirmar
              </button>
            </li>
          </ul>
        </form>
      </div>
    </PageLayout>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps<{data: formData}> = async (ctx) => {
  
  const data = {
    cedula: "10083922",
    credencial: "44-98243",
    nombre: "fabiano bruno",
    apellido: "gonzales",
    password: "--",
  }

  return {
    props: {
      data
    }
  }
}