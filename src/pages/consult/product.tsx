import { PageLayout } from "@/components/PageLayout";
import { Pagination } from "@/components/Pagination";
import { ResultBox } from "@/components/ResultBox";
import { Search } from "@/components/Search";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { setActive } from "@/context/store/features/headernav";
import { fetchProductBy } from "@/context/store/features/productR";
import { SearchState, reset_search, set_page } from "@/context/store/features/searchRedux";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

const Consult: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchS = useAppSelector((state) => state.search);
  const productResState = useAppSelector((state) => state.productsR);
  const historySearch = useRef<SearchState>(structuredClone(searchS));

  useEffect(() => {
    dispatch(setActive({ active: "consult" }));
    fetchQuery();
    return ()=>{
      dispatch(reset_search());
    }
  }, []);

  /**
   * función encargada de realizar la petidción al backend para 
   * obtener los datos de consulta
   * @param page parámetro para navegación entre páginas
   */
  function fetchQuery (){
    dispatch(fetchProductBy(searchS));
    historySearch.current = structuredClone(searchS);
  };

  /**
   * Función encargada de hacer la petición al backed
   */
  function fetchQueryByPage (page: number){
    dispatch(fetchProductBy({...historySearch.current, page}));
    dispatch(set_page({page}));
  };

  function fetchQueryRefresh (){
    dispatch(fetchProductBy(historySearch.current));
  };

  return (
    <PageLayout
      title="consultas"
      desc="Realice sus consultas en la app de seguimiento de inventario"
    >
      <main className="consult back-operator">
        <Search filter={"product"} fetchQuery={fetchQuery} fetchRefresh={fetchQueryRefresh} />
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
                  <Link href={`/edit/product/${p.codigo}`} title="editar producto">
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
        <Pagination data={productResState} callbackQuery={fetchQueryByPage} />
      </main>
    </PageLayout>
  );
};

export default Consult;