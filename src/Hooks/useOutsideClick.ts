import { useEffect, RefObject } from "react";

export const useOutsideClick = (callback: any, refs: RefObject<EventTarget | undefined>[]) => {

  useEffect(() => {
    
    const handleClick = (event: MouseEvent) => {
    const refZ = refs.reduce<Set<EventTarget>>((acc,curr)=>{
      if(curr.current){
        acc.add(curr.current)
      };
      return acc
    }, new Set());

      if (!refZ.has(event.currentTarget!)) {
          callback();
        }
    };
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  },[refs]);

  return [];
};
