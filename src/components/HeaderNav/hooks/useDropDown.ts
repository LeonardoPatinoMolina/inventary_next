import { useState } from "react"

export interface useDropDownReturns {
  animateClass: string;
  close: ()=>void;
  open: ()=>void;
}

export const useDropDown = (): useDropDownReturns =>{
  
  const [animateClass, setAnimateClass] = useState<"open_dropdown_an" | "close_dropdown_an"|"">("");
  
  const close = () =>{
    if(animateClass === "") return
    setAnimateClass("close_dropdown_an")
  };
  const open = ()=>{
    setAnimateClass("open_dropdown_an")
  };
  
  return {animateClass, close, open}
} 