import { useRouter } from "next/router";
import { useState } from "react";
import { useModal } from "../../Hooks/useModal";
import { Modal } from "../../components/Modal";
import { PageLayout } from "../../components/PageLayout";

export default function OperatorRegister() {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    cedula: "",
    credencial: "",
    nombre: "",
    apellido: "",
    password: "",
  });
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
    values.forEach((val) => v.push(exp1.exec(val)));
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
    navigate.push("/administration/operators");
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
      <div className="operator-register back-default">
        <h2>REGISTRAR OPERADOR</h2>
        <span
          className="boton material-symbols-outlined"
          onClick={() => navigate.back()}
          title="volver"
        >
          keyboard_return
        </span>
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
                value={formData.nombre}
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
                value={formData.apellido}
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
                value={formData.cedula}
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
                value={formData.credencial}
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
                value={formData.password}
                name="password"
                onChange={(e) => handleChange(e)}
                required
              />
            </li>
            <li className="operator-register__form-list__item">
              <button className="operator-register__submit boton">
                Registrar
              </button>
            </li>
          </ul>
        </form>
      </div>
    </PageLayout>
  );
}
