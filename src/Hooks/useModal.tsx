import { useState, useEffect } from "react";

export interface Loot {
  isOpen: boolean
}
type useModalReturns = [
  loot: Loot,
  showM: ()=>Promise<any>,
  confirmM: (choice: any)=>void
];

export const useModal = (initialConfig: Loot): useModalReturns => {
  /*el estado controller no es usado por ninguna vista, sin embargo, para su maipulación se
  * está usando un callback en el initial state, lo cual es un atajo para la reactividad síncrona
  * */
  const [controller, setController] = useState<AbortController>();
  /*el estado loot sí es utilizado en vista, lo ideal es 
  * establecer una interfaz para ello, el loot contiene todas las 
  * configuraciones que el modal requiera
  * entre ellas=> isOpen, type, animation, etc...
  * */
  const [loot, setLoot] = useState(initialConfig);
  
  useEffect(() => {
    return () => {
      //nos aseguramos que toda promesa pendiente sea resuelta al des-renderizar componente
      if(controller) controller.abort(false);
    };
  }, []);

  /**
   * El principio es simple, esta función no se resolverá por si sola sino que lo hará por
   * demanda, es decir, para que esta función cumpla su cometido necesita de la 
   * participación de otra función, en este caso, la afunción "confirmM", y hasta entonces 
   * el scope donde se le invoque, no resibirá respuesta de ella.
   * Naturalmente, el retorno consiste en una promesa que al resolverse contendrá un booleano
   */
  async function showM(): Promise<any> {
    setLoot({...loot, isOpen: true});//abrimos el modal
    
    //creamos un nuevo controlador y le agregamos un eventoEscucha a su evento abort
    //al dispararse este evento se ejecutará el resolve con el contenido de
    //target.reason en la cual obtenemos la respuesta de usuario
    return new Promise((resolve) => {
      const controllerNew = new AbortController()
      controllerNew.signal.addEventListener('abort', (evnt: any)=>{
        resolve(evnt.target.reason)
      })
      //por último extraemos el controllador en un estado para manipularlo de forma externa
      setController(() => controllerNew);
    });
  }

  /**
   * Esta función se encarga de disparar el evento 'abort' el cual contendrá el 
   * booleano que reperesenta la elección
   */
  function confirmM(choice: any): void {
    //resolvemos la promesa disparando el evento 'abort' e inyetamos como 
    //parametro (reason) la elección del ususario
    if(controller) controller.abort(choice);
    setLoot({...loot, isOpen: false});//cerramos el modal
  }
  //la responsabilidad de implementar la función showM está a manos del compoentne donde se 
  //declare el hook, 
  //En cuanto al loot y el confirmM, estos serán responsabilidad del Componente Modal
  return [loot, showM, confirmM];
}