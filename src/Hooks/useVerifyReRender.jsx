import React,{useRef} from 'react'

export const useVerifyReRender = () => {
  const flag = useRef();
  //evita el renderizado infinito del componente por causa del useEffect
  const verify = () => {// retorna [true] si detecta una segunda renderizacion y [false] si es la primera
    if (flag.current === undefined) {
      flag.current = true;
      return false;
    } else {
      flag.current = undefined;
      return true;
    }
  };

  return [verify]
}
