import { useRouter } from "next/router";
import { useState } from "react";
import { useModal } from "../../Hooks/useModal";
import { Modal } from "../../components/Modal";
import { PageLayout } from "../../components/PageLayout";

export default function RegiserProduct() {//contexto 2

  const [isOpenAviso, openModalAviso, closeModalAviso] = useModal({isOpen: false});
  const [
    isOpenResponseSuccess,
    openModalResponseSuccess,
    closeModalResponseSuccess,
  ] = useModal({isOpen: false});
  const [
    isOpenResponseWarning,
    openModalResponseWarning,
    closeModalResponseWarning,
  ] = useModal({isOpen: false});
  const [isOpenResponseError, openModalResponseError, closeModalResponseError] =
    useModal({isOpen: false});
  const navigate = useRouter();
  const [formData, setformData] = useState({
    codigo: "",
    prenda: "",
    ubicacion: "",
    talla: "",
    color: "",
    sexo: "",
    valorUnitario: "",
    cantidad: "",
  });

  const verification = () => {
    const exp = /^\w{1,3}-\w{1,3}-\w{1,3}$/g; //verifica el formato de la ubicación
    const exp1 = /[\^!¡¿?$#&/().=`´°|<>*;\\,{}]/g;
    let v = [];
    const values = Object.values(formData);
    values.forEach((val) => v.push(exp1.exec(val)));
    if (!exp.test(formData.ubicacion)) v.push("¡--!");
    const validator = v.filter((aja) => aja !== null);
    return validator.length === 0;
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if(e.target === null)return;
    e.target.setAttribute("disabled", "");

    if (!verification()) {
      e.target.removeAttribute("disabled");
      return openModalResponseWarning();
    }
    // try {
    //   openModalAviso();
    //   const envioData = await registrarProducto(formData);
    //   if (!envioData.success) {
    //     e.target.removeAttribute("disabled");
    //     closeModalAviso();
    //     return openModalResponseError();
    //   }
    //   closeModalAviso();
    //   openModalResponseSuccess();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const closeModalResponseSuccess2 = () => {
    // funcion encargada de cerrar modal exitoso y salirse de la ventana
    // closeModalResponseSuccess();
    navigate.push("/consult/product");
  };

  return (
    <PageLayout title="Registrar producto" desc='Registrar nuevo producto con sus datos en formulario'>
      {/* <Modal title="AVISO" loot={isOpenAviso}>
        Por favor espere mientras validamos la información...
      </Modal> */}
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
        La tarea ha fallado, los siguientes cracteres no están permitidos:{" "}
        <br />
        ^!¡¿?$#&/{`()`}.=`°|*;\{`<>`}
        <br /> Verifique el campo de ubicación si cumple con el formato
        xx-xx-xx.
      </Modal>
      <Modal
        title="ERROR"
        loot={isOpenResponseError}
        confirmM={closeModalResponseError}
      >
        La tarea ha fallado, verifique su conexión o intente más tarde.
      </Modal>
      <section className="product-register back-operator">
        <h2 className="product-register__title">REGISTRAR PRODUCTO</h2>
        <div className="product-register__return boton">
          Volver
          <span
            className=" material-symbols-outlined"
            onClick={() => navigate.push('/consult/product')}
            title="volver"
          >
            keyboard_return
          </span> 
        </div>
        <form id="product-register__form" onSubmit={submitHandler}>
          <ul className="product-register__list">
            <li className="product-register__item">
              <label htmlFor="product-register__product-register__item-codigo">
                Código:
              </label>
              <input
                type="number"
                id="product-register__item-codigo"
                className="product-register__field"
                placeholder="Digite un codigo"
                onChange={(e) =>
                  setformData({
                    ...formData,
                    codigo: e.target.value.slice(0, 11),
                  })
                }
                value={formData.codigo}
                required
                maxLength={12}
              />
            </li>
            <li className="product-register__item">
              <label htmlFor="produt-register__product-register__item-nombre">
                Tipo de prenda:
              </label>
              <select
                name="select-prenda-RP"
                title="prenda"
                id="product-register__prenda"
                className="product-register__field"
                form="product-register__form"
                value={formData.prenda}
                onChange={(e) =>
                  setformData({ ...formData, prenda: e.target.value })
                }
                required
              >
                <option
                  value="default"
                  className="product-register__sex-option-"
                >
                  Seleccionar
                </option>
                <option value="1" className="product-register__sex-option-">
                  Abrigo
                </option>
                <option value="2" className="product-register__sex-option-">
                  Bermuda
                </option>
                <option value="3" className="product-register__sex-option-">
                  Blusa
                </option>
                <option value="4" className="product-register__sex-option-">
                  Buzo
                </option>
                <option value="5" className="product-register__sex-option-">
                  Camisa
                </option>
                <option value="6" className="product-register__sex-option-">
                  Falda
                </option>
                <option value="7" className="product-register__sex-option-">
                  Gorro
                </option>
                <option value="8" className="product-register__sex-option-">
                  Medias
                </option>
                <option value="9" className="product-register__sex-option-">
                  Pantalon
                </option>
                <option value="10" className="product-register__sex-option-">
                  Pantaloneta
                </option>
                <option value="11" className="product-register__sex-option-">
                  Short
                </option>
                <option value="12" className="product-register__sex-option-">
                  Sueter
                </option>
              </select>
            </li>
            <li className="product-register__item">
              <label htmlFor="produt-register__product-register__item-ubicacion">
                Ubicación:
              </label>
              <input
                type="text"
                id="product-register__item-ubicacion"
                className="product-register__field"
                placeholder="Bloque-Nivel-Línea"
                value={formData.ubicacion}
                onChange={(e) =>
                  setformData({ ...formData, ubicacion: e.target.value.trim() })
                }
                required
              />
            </li>
            <li className="product-register__item">
              <label htmlFor="product-register__item-talla">Talla</label>
              <input
                type="number"
                id="product-register__product-register__item-talla"
                className="product-register__field"
                placeholder="Digite una talla"
                value={formData.talla}
                onChange={(e) =>
                  setformData({
                    ...formData,
                    talla: e.target.value.slice(0, 3),
                  })
                }
                required
              />
            </li>
            <li className="product-register__item">
              <label htmlFor="product-register__color">Color:</label>
              <select
                name="select-calor-RP"
                title="color"
                id="product-register__color"
                className="product-register__field"
                form="product-register__form"
                value={formData.color}
                onChange={(e) =>
                  setformData({ ...formData, color: e.target.value })
                }
                required
              >
                <option
                  value="default"
                  className="product-register__color-option-"
                >
                  Seleccionar
                </option>
                <option value="1" className="product-register__color-option-">
                  Amarillo
                </option>
                <option value="2" className="product-register__color-option-">
                  Azul
                </option>
                <option value="3" className="product-register__color-option-">
                  Cian
                </option>
                <option value="4" className="product-register__color-option-">
                  Lima
                </option>
                <option value="5" className="product-register__color-option-">
                  Naranja
                </option>
                <option value="6" className="product-register__color-option-">
                  Morado
                </option>
                <option value="7" className="product-register__color-option-">
                  Rojo
                </option>
                <option value="8" className="product-register__color-option-">
                  Rosa
                </option>
                <option value="9" className="product-register__color-option-">
                  Verde
                </option>
                <option value="10" className="product-register__color-option-">
                  Violeta
                </option>
              </select>
            </li>
            <li className="product-register__item">
              <label htmlFor="product-register__sex">Sexo:</label>
              <select
                name="select-sexo-RP"
                title="sexo"
                id="product-register__sex"
                className="product-register__field"
                form="product-register__form"
                value={formData.sexo}
                onChange={(e) =>
                  setformData({ ...formData, sexo: e.target.value })
                }
                required
              >
                <option
                  value="default"
                  className="product-register__sex-option-"
                >
                  Seleccionar
                </option>
                <option value="F" className="product-register__sex-option-">
                  Niña
                </option>
                <option value="M" className="product-register__sex-option-">
                  Niño
                </option>
              </select>
            </li>
            <li className="product-register__item">
              <label htmlFor="product-register__precio">Valor unitario:</label>
              <input
                type="number"
                id="product-register__precio"
                className="product-register__field"
                placeholder="Digite un precio"
                defaultValue={formData.valorUnitario}
                onChange={(e) =>
                  setformData({ ...formData, valorUnitario: e.target.value })
                }
                required
              />
            </li>
            <li className="product-register__item">
              <label htmlFor="product-register__precio">Cantidad:</label>
              <input
                type="number"
                id="product-register__precio"
                className="product-register__field"
                placeholder="Digite una cifra"
                defaultValue={formData.cantidad}
                onChange={(e) =>
                  setformData({ ...formData, cantidad: e.target.value })
                }
                required
              />
            </li>
            <li className="product-register__item">
              <input
                type="submit"
                className="product-register__submit boton"
                value="Regitrar"
              />
            </li>
          </ul>
        </form>
      </section>
    </PageLayout>
  );
}
