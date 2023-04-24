import { useSlider } from "@/Hooks/useSlider";
import styles from './style/Slider.module.scss';
import React, { LegacyRef, useRef } from "react";

export const Slider: React.FC<{children: React.ReactNode[]}> = ({children})=>{

  const container = useRef<HTMLDivElement>();
  const {next,back, disableBtn} = useSlider({container, transitionDuration: 500});
  
  return (
    <section>
      <div  className={styles.slider}>
        <div ref={container as LegacyRef<HTMLDivElement>} className={styles.slider__container}>
          {children.map((child, indx)=>(
            <article className={styles.slider__container__slide}>
              {child}{indx}
            </article>
          ))}
        </div>
      </div>
      <nav className={styles.slider__nav}>
        <button className={styles.slider__nav__btn} onClick={back} disabled={disableBtn}>←</button>
        <button className={styles.slider__nav__btn} onClick={next} disabled={disableBtn}>→</button>
      </nav>
    </section>
  )
}