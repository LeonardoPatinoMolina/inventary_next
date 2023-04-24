import React, { useState } from "react";

interface useSliderReturns {
  next: ()=>void;  
  back: ()=>void;  
  disableBtn: boolean;
}
interface useSliderArgs {
  container: React.MutableRefObject<HTMLDivElement|undefined>;
  transitionDuration?: number;
}

export const useSlider = ({container, transitionDuration}: useSliderArgs): useSliderReturns=>{

  const [currentPos, setcurrentPos] = useState<number>(0);
  const [disableBtn, setDisableBtn] = useState<boolean>(false)

  const back = ()=>{
    setDisableBtn(true);
    const an = container?.current?.animate([
        {transform: `translateX(${currentPos !== 0 ? currentPos * 400 : 0}px)`},
        {transform: `translateX(${currentPos !== 0 ? (currentPos * 400) + 400 : 400}px)`},
      ],
      {duration: transitionDuration ?? 500, easing: 'ease-out',fill: 'forwards'});
      setcurrentPos(prev=>prev + 1);
      an?.addEventListener('finish',()=>{
        if(currentPos <= -1){
          container.current?.prepend(container.current!.lastElementChild!);
          correctivePosition('back');
        }
        setDisableBtn(false);
      },{once: true})
    }//end back

    const next = ()=>{
      setDisableBtn(true);
      const an = container?.current?.animate([
          {transform: `translateX(${currentPos !== 0 ? currentPos * 400 : 0}px)`},
          {transform: `translateX(${currentPos !== 0 ? (currentPos * 400) - 400 : -400}px)`},
        ],
        {duration: transitionDuration ?? 500, easing: 'ease-out',fill: 'forwards'});
      setcurrentPos(prev=>prev - 1);
      an?.addEventListener('finish',()=>{
        if(currentPos <= - (container.current?.childElementCount! - 2)){
          container?.current?.append(container.current.firstElementChild!)
          correctivePosition('next');
        }
        setDisableBtn(false);
      },{once: true})
    }//end next

  const correctivePosition = (limit: "back" | "next")=>{
    if(limit === "next"){
      container?.current?.animate([
        {transform: `translateX(${(currentPos - 1) * 400}px)`},
        {transform: `translateX(${((currentPos - 1)  * 400) + 400}px)`},
      ],
      {duration: 0, fill: 'forwards'});
      setcurrentPos(prev=>prev + 1);

    }else{
      container?.current?.animate([
        {transform: `translateX(${(currentPos + 1) * 400}px)`},
        {transform: `translateX(${((currentPos + 1) * 400) - 400}px)`},
      ],
      {duration: 0, fill: 'forwards'});
      setcurrentPos(prev=>prev - 1);
    }
  }//end correctivePosition

  return {next,back, disableBtn}
}