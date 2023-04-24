import React, { useState } from "react";

export interface PaginationProps {
  callbackQuery: (page?: number)=>void; //funcion encargada de disparar la navegación entre querys
  data: any;
}

interface BtnActiveState{
  next: boolean;
  back: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({callbackQuery, data})=>{

  const [buttonActive, setButtonActive] = useState<BtnActiveState>(verifyBtnActive)

  const next = ()=>{
    if(data.page + 1 === data.totalPages){
      setButtonActive({
        next: false, back: true
      })
    }else if(data.page + 1 > data.totalPages){
      return
    }else{
      setButtonActive({
        next: true, back: true
      });
    }
    callbackQuery(data.page + 1);
  }//end next

  const back=()=>{
    if(data.page - 1 === 1){
      setButtonActive({
        next: true, back: false
      })
    }else if(data.page - 1 < 1){
      return
    }else{
      setButtonActive({
        next: true, back: true
      });
    }
    callbackQuery(data.page - 1)
  }

  function verifyBtnActive(): BtnActiveState{
    if(data.page === undefined) return {next: false, back: false}
    console.log(data.page, data.totalPages)
    if(data.page === data.totalPages){
      if(data.page === 1){
        return {next: false, back: false}
      }else{
        return {next: false, back: true}
      }
    }else {
      if (data.page > 1){
      return {next: true, back: true}
    }
    else{
        return {next: true, back: false}
      }
    }
  }

  return (
    <nav className="pagination">
      <ul className="pagination__list">
        <li className="pagination__list__item">
          <button 
            className="pagination__list__item__btn" 
            disabled={!buttonActive.back}
            onClick={back}
          >back</button>
        </li>
        <li className="pagination__list__item">Página: {data.page ?? 0}/{data.totalPages ?? 0}</li>
        <li className="pagination__list__item">
          <button 
            className="pagination__list__item__btn" 
            disabled={!buttonActive.next}
            onClick={next}
          >next</button>
        </li>
      </ul>
    </nav>
  )
}