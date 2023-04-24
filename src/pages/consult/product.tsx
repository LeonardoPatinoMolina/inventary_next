import { PageLayout } from "@/components/PageLayout";
import { Pagination } from "@/components/Pagination";
import { ResultBox } from "@/components/ResultBox";
import { Search } from "@/components/Search";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { setActive } from "@/context/store/features/headernav";
import { fetchProductBy } from "@/context/store/features/productR";
import Link from "next/link";
import React, { useEffect } from "react";

const Consult: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchS = useAppSelector((state) => state.search);
  const productResState = useAppSelector(
    (state) => state.productsR
  );

  useEffect(() => {
    dispatch(setActive({ active: "consult" }));
  }, []);

  /**
   * función encargada de realizar la petidción al backend para 
   * obtener los datos de consulta
   * @param page parámetro para navegación entre páginas
   */
  const fetchQuery = (page?: number) => {
    if(!!page){
      dispatch(fetchProductBy({...searchS, page}));
    }else{
      dispatch(fetchProductBy(searchS));
    }
  };

  return (
    <PageLayout
      title="consultas"
      desc="Realice sus consultas en la app de seguimiento de inventario"
    >
      <main className="consult back-operator">
        <Search filter={"product"} searchCallback={fetchQuery} />
        <ResultBox data={productResState}>
          {productResState.isSuccess &&
            !productResState.isLoading ?
            productResState.products.map((p: any) => (
              <tr
                key={p.codigo}
                title="producto"
                id={p.codigo}
                className="resultbox__item"
                onClick={() => {}}
                onDoubleClick={() => {}}
              >
                <td className="resultbox__p">{p.codigo}</td>
                <td className="resultbox__p">{p.prenda}</td>
                <td className="resultbox__p">{p.color}</td>
                <td className="resultbox__p">
                  {p.status === 1 ? "disponible" : "No disponible"}
                </td>
                <td className="resultbox__p">{p.cantidad}</td>
                <td className="resultbox__p">
                  <Link href="#" title="editar producto">
                    <span
                      title="editar producto"
                      className="boton material-symbols-outlined"
                    >
                      edit
                    </span>
                  </Link>
                  <span
                    title="remover producto"
                    className="delete-btn material-symbols-outlined"
                  >
                    delete
                  </span>
                </td>
              </tr>
            )) : <tr className="resultbox__item"><td className="resultbox__p">loading...</td></tr>}
        </ResultBox>
        <Pagination data={productResState} callbackQuery={fetchQuery} />
      </main>
    </PageLayout>
  );
};

export default Consult;