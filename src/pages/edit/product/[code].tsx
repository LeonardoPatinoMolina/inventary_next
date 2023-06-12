//components
import { Modal } from "../../../components/Modal";
//dependences
import { useRouter } from "next/router";
import { FC, useRef, useState } from "react";
import { useModal } from "../../../Hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../../context/reduxHooks";

interface EditProductProps{
  dataProduct: any
}

const ProductModifier: FC<EditProductProps> = ({dataProduct}) => {
  const navigate = useRouter();
  const CODE = navigate.query.code;
  const dispatch = useAppDispatch();
  const [advertModalIsOpen, openAdvertModal, closeAdvertModal] =
    useModal({isOpen: false});
  const [isOpenAviso, openModalAviso, closeModalAviso] = useModal({isOpen: false});
  const [
    isOpenResponseSuccess,
    openModalResponseSuccess,
    closeModalResponseSuccess,
  ] = useModal({isOpen: false});
  const [isOpenResponseError, openModalResponseError, closeModalResponseError] =
    useModal({isOpen: false});
  const [isOpenResponseWarning, openModalResponseWarning, closeModalResponseWarning] =
    useModal({isOpen: false});

  const [dataForForm, setdataForForm] = useState(dataProduct);
  const [currentProduct] = useState({
    prenda: dataForForm.pre_Id,
    ubicacion: dataForForm.pro_Ubicacion,
    talla: dataForForm.pro_Talla,
    color: dataForForm.col_Id,
    sexo: dataForForm.pro_Sexo,
    valorUnitario: dataForForm.pro_ValorUnitario,
    cantidad: dataForForm.pro_Cantidad,
  });
  const { idUser } = useAppSelector(state => state.login);
  // const { codeProductSelected } = useSelector(state => state.temp);
  const data = useRef<any>({});

  const verification = () => {
    const prendaR =
      currentProduct.prenda === dataForForm.pre_Id ? "def" : dataForForm.pre_Id;
    const ubicacionR =
      currentProduct.ubicacion === dataForForm.pro_Ubicacion
        ? "def"
        : dataForForm.pro_Ubicacion;
    const tallaR =
      currentProduct.talla === dataForForm.pro_Talla
        ? "def"
        : dataForForm.pro_Talla;
    const colorR =
      currentProduct.color === dataForForm.col_Id ? "def" : dataForForm.col_Id;
    const sexoR =
      currentProduct.sexo === dataForForm.pro_Sexo
        ? "def"
        : dataForForm.pro_Sexo;
    const valorUnitarioR =
      currentProduct.valorUnitario !== dataForForm.pro_ValorUnitario ||
      currentProduct.cantidad !== dataForForm.pro_Cantidad
        ? dataForForm.pro_ValorUnitario
        : "def";
    const cantidadR =
      currentProduct.valorUnitario !== dataForForm.pro_ValorUnitario ||
      currentProduct.cantidad !== dataForForm.pro_Cantidad
        ? dataForForm.pro_Cantidad
        : "def";
    data.current = {
      objetivo: "producto",
      userId: idUser,
      codigo: dataForForm.pro_Codigo,
      prenda: prendaR,
      ubicacion: ubicacionR,
      talla: tallaR,
      color: colorR,
      sexo: sexoR,
      valorunitario: valorUnitarioR,
      cantidad: cantidadR,
    };
    //-------------
    const exp = /^\w{1,3}-\w{1,3}-\w{1,3}$/g; //verifica el formato campos
    const exp1 = /[\^!¡¿?$#&/().=`´°|<>*;\\,{}]/g;
    let v = [];
    const values = Object.values(data.current);
    values.forEach((val: any) => v.push(exp1.exec(val)));
    if (data.current.ubicacion !== 'def' && !exp.test(data.current.ubicacion)) v.push("¡--!");
    const validator = v.filter((aja) => aja !== null);
    console.log(validator.length);
    if(validator.length !== 0) return 'error-format';
    //-------------
    const vals = Object.values(data.current);
    const verify = vals.filter((el) => el !== "def");
    if (verify.length === 3) return 'error-input';
    else return console.log('epa');
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(e.target === null) throw new Error('no hay formulario designado')
    e.target.setAttribute("disabled", "");

    const very = verification()
    if (very === 'error-format') {
      openModalResponseWarning();
      return e.target.removeAttribute("disabled");
    }
    if (very === 'error-input') {
      openAdvertModal();
      return e.target.removeAttribute("disabled");
    }
    // try {
    //   openModalAviso();
    //   const envioData = await modificarProducto(data.current);
    //   closeModalAviso();

    //   if (!envioData.success) {
    //     e.target.removeAttribute("disabled");
    //     return openModalResponseError();
    //   }
    //   openModalResponseSuccess();
    //   console.log("epa");
    //   dispatch(fetchProducts());
    //   e.target.removeAttribute("disabled");
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
    <PageLayout title='Editar producto' desc='modificque según le convenga el presente producto'>
      {/* <Modal title="AVISO" loot={isOpenAviso}>
        Por favor espere mientras validamos la información...
      </Modal> */}
      <Modal
        title="OBSERVACIÓN"
        loot={advertModalIsOpen}
        confirmM={closeAdvertModal}
      >
        No se detectó ningún cambio, verifique los campos del formulario
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
        La tarea ha fallado, los siguientes cracteres no están permitidos:{" "}
        <br />
        ^!¡¿?$#&/{`()`}.=,`°|*;\{`<>`}
        <br /> Verifique el campo de ubicación si cumple con el formato
        xx-xx-xx.
      </Modal>
      <Modal
        title="ERROR"
        loot={isOpenResponseError}
        confirmM={closeModalResponseError}
      >
        La tarea a fallado, verifique que la información ingresada sea válida.
      </Modal>
      <div className="product-modifer back-operator">
        <h2 className="product-modifer__title">MODIFICAR PRODUCTO</h2>
        <div >
          <button className="product-modifer__control" onClick={()=>{navigate.back()}}>
          <div className="product-register__return boton">
            Volver
            <span className="material-symbols-outlined" title="volver">
              keyboard_return
            </span>
          </div>
          </button>
          <p id="product-modifer__codigo-marc">
            CÓDIGO: <b>{CODE}</b>
          </p>
        </div>
        <form id="product-modifer__form" onSubmit={handleSubmit}>
          <ul className="product-modifer__form-list">
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
                value={dataForForm.pre_Id}
                onChange={(e) =>
                  setdataForForm({ ...dataForForm, pre_Id: e.target.value })
                }
                required
              >
                <option
                  value="default"
                  className="product-register__prenda-option-"
                >
                  Seleccionar
                </option>
                <option
                  value="1"
                  className="product-register__prenda-option-"
                  id="prenda1"
                >
                  Abrigo
                </option>
                <option
                  value="2"
                  className="product-register__prenda-option-"
                  id="prenda2"
                >
                  Bermuda
                </option>
                <option
                  value="3"
                  className="product-register__prenda-option-"
                  id="prenda3"
                >
                  Blusa
                </option>
                <option
                  value="4"
                  className="product-register__prenda-option-"
                  id="prenda4"
                >
                  Buzo
                </option>
                <option
                  value="5"
                  className="product-register__prenda-option-"
                  id="prenda5"
                >
                  Camisa
                </option>
                <option
                  value="6"
                  className="product-register__prenda-option-"
                  id="prenda6"
                >
                  Falda
                </option>
                <option
                  value="7"
                  className="product-register__prenda-option-"
                  id="prenda7"
                >
                  Gorro
                </option>
                <option
                  value="8"
                  className="product-register__prenda-option-"
                  id="prenda8"
                >
                  Medias
                </option>
                <option
                  value="9"
                  className="product-register__prenda-option-"
                  id="prenda9"
                >
                  Pantalon
                </option>
                <option
                  value="10"
                  className="product-register__prenda-option-"
                  id="prenda10"
                >
                  Pantaloneta
                </option>
                <option
                  value="11"
                  className="product-register__prenda-option-"
                  id="prenda11"
                >
                  Short
                </option>
                <option
                  value="12"
                  className="product-register__prenda-option-"
                  id="prenda12"
                >
                  Sueter
                </option>
              </select>
            </li>
            <li className="product-modifer__item">
              <label htmlFor="nombre">Ubicación:</label>
              <input
                type="text"
                id="product-modifer__ubicacion"
                className="product-modifer__field"
                placeholder="Nueva ubicación"
                defaultValue={dataForForm.pro_Ubicacion}
                onChange={(e) =>
                  setdataForForm({
                    ...dataForForm,
                    pro_Ubicacion: e.target.value,
                  })
                }
                required
              />
            </li>
            <li className="product-modifer__item">
              <label htmlFor="input__talla-MP">Talla</label>
              <input
                type="number"
                id="product-modifer__talla"
                className="product-modifer__field"
                placeholder="Nueva talla"
                defaultValue={dataForForm.pro_Talla}
                onChange={(e) =>
                  setdataForForm({ ...dataForForm, pro_Talla: e.target.value })
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
                value={dataForForm.col_Id}
                onChange={(e) =>
                  setdataForForm({ ...dataForForm, col_Id: e.target.value })
                }
                required
              >
                <option
                  value="default"
                  className="product-register__color-option-"
                >
                  Seleccionar
                </option>
                <option
                  value="1"
                  className="product-register__color-option-"
                  id="color1"
                >
                  Amarillo
                </option>
                <option
                  value="2"
                  className="product-register__color-option-"
                  id="color2"
                >
                  Azul
                </option>
                <option
                  value="3"
                  className="product-register__color-option-"
                  id="color3"
                >
                  Cian
                </option>
                <option
                  value="4"
                  className="product-register__color-option-"
                  id="color4"
                >
                  Lima
                </option>
                <option
                  value="5"
                  className="product-register__color-option-"
                  id="color5"
                >
                  Naranja
                </option>
                <option
                  value="6"
                  className="product-register__color-option-"
                  id="color6"
                >
                  Morado
                </option>
                <option
                  value="7"
                  className="product-register__color-option-"
                  id="color7"
                >
                  Rojo
                </option>
                <option
                  value="8"
                  className="product-register__color-option-"
                  id="color8"
                >
                  Rosa
                </option>
                <option
                  value="9"
                  className="product-register__color-option-"
                  id="color9"
                >
                  Verde
                </option>
                <option
                  value="10"
                  className="product-register__color-option-"
                  id="color10"
                >
                  Violeta
                </option>
              </select>
            </li>
            <li className="product-modifer__item">
              <label htmlFor="product-modifer__sexo">Sexo:</label>
              <select
                name="select-sexo-MP"
                title="sexo"
                className="product-modifer__field select-sexo"
                form="form__formulario-mod-producto"
                value={dataForForm.pro_Sexo}
                onChange={(e) =>
                  setdataForForm({ ...dataForForm, pro_Sexo: e.target.value })
                }
                required
              >
                <option
                  value="default"
                  className="product-modifer__option-sexo"
                >
                  seleccionar
                </option>
                <option
                  value="F"
                  className="product-modifer__option-sexo"
                  id="sexo1"
                >
                  Niña
                </option>
                <option
                  value="M"
                  id="sexo2"
                  className="product-modifer__option-sexo"
                >
                  Niño
                </option>
              </select>
            </li>
            <li className="product-modifer__item">
              <label htmlFor="input__precio-MP">Valor unitario:</label>
              <input
                type="number"
                id="product-modifer__precio"
                className="product-modifer__field"
                placeholder="Nuevo precio"
                defaultValue={dataForForm.pro_ValorUnitario}
                onChange={(e) =>
                  setdataForForm({
                    ...dataForForm,
                    pro_ValorUnitario: e.target.value,
                  })
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
                defaultValue={dataForForm.pro_Cantidad}
                onChange={(e) =>
                  setdataForForm({
                    ...dataForForm,
                    pro_Cantidad: e.target.value,
                  })
                }
                required
              />
            </li>
            <li className="product-modifer__item">
              <input
                type="submit"
                className="product-modifer__submit boton"
                value="Confirmar"
              />
            </li>
          </ul>
        </form>
      </div>
    </PageLayout>
  );
}

export default ProductModifier;
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next';
import { PageLayout } from "../../../components/PageLayout";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = {
    prenda: '2',
    ubicacion: '12-12-00',
    talla: '14',
    color: '2',
    sexo: 'F',
    valorUnitario: '1000',
    cantidad: '2',
  }

  return {
    props: {
      dataProduct: data
    }
  }
}