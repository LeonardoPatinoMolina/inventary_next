import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState } from "react";
import { Modal } from "../../components/Modal";
import { useModal } from "../../components/Modal/hooks/useModal";
import { PageLayout } from "../../components/PageLayout";

export type ColoresT = {name: string, id: string}
export type PrendasT = ColoresT

export interface productProps{
  PRENDAS: PrendasT[];
  COLORES: ColoresT[];
}

export default function RegiserProduct(props: productProps) {//contexto 2

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
        <Link href="/consult/product" className="product-register__return boton">
          Volver
          <span
            className=" material-symbols-outlined"
            // onClick={() => navigate.push('')}
            title="volver"
          >
            keyboard_return
          </span> 
        </Link>
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
                {props.PRENDAS.map((pre)=><option
                  value={pre.id}
                  key={`predaid-${pre.id}`}
                  className="product-register__prenda-option-"
                >
                  {pre.name}
                </option>)}
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
                {props.COLORES.map((col,ci)=><option
                  value={col.id}                  
                  className="product-register__color-option-"
                  key={`opcolor-${col.id}`}
                >
                  {col.name}
                </option>)}
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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps<productProps> = async (ctx) => {
  
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

  return {
    props: {
      PRENDAS, COLORES
    }
  }
}