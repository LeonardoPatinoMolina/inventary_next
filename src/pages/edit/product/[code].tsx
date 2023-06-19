//components
import { Modal } from "../../../components/Modal";
//dependences
import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";
import { FC, useRef, useState } from "react";
import { useModal } from "../../../components/Modal/hooks/useModal";
import { PageLayout } from "../../../components/PageLayout";
import { useAppDispatch, useAppSelector } from "../../../context/reduxHooks";
import { ColoresT, PrendasT } from "../../register/product";

interface EditProductProps{
  dataProduct: formData;
  PRENDAS: PrendasT[];
  COLORES: ColoresT[];
}

interface formData {
  codigo: string
  prenda: string;
  ubicacion: string;
  talla: string;
  color: string;
  sexo: string;
  valorUnitario: string;
  cantidad: string;
}

const ProductModifier: FC<EditProductProps> = (props) => {
  const router = useRouter();
  const CODE = router.query.code;
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

  const [dataForForm, setdataForForm] = useState<formData>(props.dataProduct);
  const [currentProduct] = useState<formData>(props.dataProduct);
  const { idUser } = useAppSelector(state => state.login);
  // const { codeProductSelected } = useSelector(state => state.temp);
  const data = useRef<any>({});

  const verification = () => {
    const prendaR =
      currentProduct.prenda === dataForForm.prenda ? "def" : dataForForm.prenda;
    const ubicacionR =
      currentProduct.ubicacion === dataForForm.ubicacion
        ? "def"
        : dataForForm.ubicacion;
    const tallaR =
      currentProduct.talla === dataForForm.talla
        ? "def"
        : dataForForm.talla;
    const colorR =
      currentProduct.color === dataForForm.color ? "def" : dataForForm.color;
    const sexoR =
      currentProduct.sexo === dataForForm.sexo
        ? "def"
        : dataForForm.sexo;
    const valorUnitarioR =
      currentProduct.valorUnitario !== dataForForm.valorUnitario ||
      currentProduct.cantidad !== dataForForm.cantidad
        ? dataForForm.valorUnitario
        : "def";
    const cantidadR =
      currentProduct.valorUnitario !== dataForForm.valorUnitario ||
      currentProduct.cantidad !== dataForForm.cantidad
        ? dataForForm.cantidad
        : "def";
    data.current = {
      objetivo: "producto",
      userId: idUser,
      codigo: dataForForm.codigo,
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
    router.push("/consult/product");
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
          <button className="product-modifer__control" onClick={()=>{router.back()}}>
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
                value={dataForForm.prenda}
                onChange={(e) =>
                  setdataForForm({ ...dataForForm, prenda: e.target.value })
                }
                required
              >
                <option
                  value="default"
                  className="product-register__prenda-option-"
                >
                  Seleccionar
                </option>
                {props.PRENDAS.map((pre)=><option
                  value={pre.id}
                  key={`predaid-${pre.id}`}
                  className="product-register__prenda-option-"
                >
                  {pre.name}
                </option>)}                
              </select>
            </li>
            <li className="product-modifer__item">
              <label htmlFor="nombre">Ubicación:</label>
              <input
                type="text"
                id="product-modifer__ubicacion"
                className="product-modifer__field"
                placeholder="Nueva ubicación"
                defaultValue={dataForForm.ubicacion}
                onChange={(e) =>
                  setdataForForm({
                    ...dataForForm,
                    ubicacion: e.target.value,
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
                defaultValue={dataForForm.talla}
                onChange={(e) =>
                  setdataForForm({ ...dataForForm, talla: e.target.value })
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
                value={dataForForm.color}
                onChange={(e) =>
                  setdataForForm({ ...dataForForm, color: e.target.value })
                }
                required
              >
                <option
                  value="default"
                  className="product-register__color-option-"
                >
                  Seleccionar
                </option>
                {props.COLORES.map((col,ci)=><option
                  value={col.id}                  
                  className="product-register__color-option-"
                  key={`opcolor-${col.id}`}
                >
                  {col.name}
                </option>)}
              </select>
            </li>
            <li className="product-modifer__item">
              <label htmlFor="product-modifer__sexo">Sexo:</label>
              <select
                name="select-sexo-MP"
                title="sexo"
                className="product-modifer__field select-sexo"
                form="form__formulario-mod-producto"
                value={dataForForm.sexo}
                onChange={(e) =>
                  setdataForForm({ ...dataForForm, sexo: e.target.value })
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
                defaultValue={dataForForm.valorUnitario}
                onChange={(e) =>
                  setdataForForm({
                    ...dataForForm,
                    valorUnitario: e.target.value,
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
                defaultValue={dataForForm.cantidad}
                onChange={(e) =>
                  setdataForForm({
                    ...dataForForm,
                    cantidad: e.target.value,
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
export const getServerSideProps: GetServerSideProps<{dataProduct: formData, PRENDAS: PrendasT[], COLORES: ColoresT[]}> = async (ctx) => {
  
  const PRENDAS: PrendasT[] = [
    {name: 'Abrigo',id: '1'},
    {name: 'Bermuda',id: '2'},
    {name: 'Blusa',id: '3'},
    {name: 'Buzo',id: '4'},
    {name: 'Camisa',id: '5'},
    {name: 'Falda',id: '6'},
    {name: 'Gorro',id: '7'},
    {name: 'Medias',id: '8'},
    {name: 'Pantalon',id: '9'},
    {name: 'Pantaloneta',id: '10'},
    {name: 'Short',id: '11'},
    {name: 'Sueter',id: '12'},
  ]
  const COLORES: ColoresT[] = [
    {name:'Amarillo',id: '1'},
    {name:'Azul',id: '2'},
    {name: 'Cian',id: '3'},
    {name: 'Lima',id: '4'},
    {name: 'Naranja',id: '5'},
    {name: 'Morado',id: '6'},
    {name: 'Rojo',id: '7'},
    {name: 'Rosa',id: '8'},
    {name: 'Verde',id: '9'},
    {name: 'Violeta',id: '10'}
  ]


  const dataProduct: formData = {
    codigo: '00220',
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
      dataProduct,
      PRENDAS,
      COLORES
    }
  }
}
