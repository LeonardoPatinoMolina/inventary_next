import { PageLayout } from "@/components/PageLayout";
import { Pagination } from "@/components/Pagination";
import { ResultBox } from "@/components/ResultBox";
import { Search } from "@/components/Search";
import { useAppDispatch, useAppSelector } from "@/context/reduxHooks";
import { setActive } from "@/context/store/features/headernav";
import { SearchState, reset_search, set_page } from "@/context/store/features/searchRedux";
import React, { useEffect, useRef } from "react";
import { fetchRecordBy } from "../../context/store/features/recordR";

const Consult: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchS = useAppSelector((state) => state.search);
  const recordResState = useAppSelector((state) => state.recordR);
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
    dispatch(fetchRecordBy(searchS));
    historySearch.current = structuredClone(searchS);
  };

  /**
   * Función encargada de hacer la petición al backed
   */
  function fetchQueryByPage (page: number){
    dispatch(fetchRecordBy({...historySearch.current, page}));
    dispatch(set_page({page}));
  };

  function fetchQueryRefresh (){
    dispatch(fetchRecordBy(historySearch.current));
  };

  return (
    <PageLayout
      title="consultas"
      desc="Realice sus consultas en la app de seguimiento de inventario"
    >
      <main className="consult back-operator">
        <Search filter={"record"} fetchQuery={fetchQuery} fetchRefresh={fetchQueryRefresh} />
        <ResultBox data={recordResState}>
          {recordResState.isSuccess &&
            !recordResState.isLoading ?
            recordResState.records.map((r: any, _: number) => (
              <tr
                key={`record-res-key-${_}`}
                title="histórico"
                className="resultbox__item"
                onClick={() => {}}
                onDoubleClick={() => {}}
              >
                <td className="resultbox__p">{r.productId}</td>
                <td className="resultbox__p">{r.fecha}</td>
                <td className="resultbox__p">{r.hora}</td>
                <td className="resultbox__p">{r.operacion}</td>
                <td className="resultbox__p">{r.operadorNombre}</td>
                <td className="resultbox__p">{r.operadorCedula}</td>
              </tr>
            )) : <tr className="resultbox__item"><td className="resultbox__p">loading...</td></tr>}
        </ResultBox>
        <Pagination data={recordResState} callbackQuery={fetchQueryByPage} />
      </main>
    </PageLayout>
  );
};

export default Consult;