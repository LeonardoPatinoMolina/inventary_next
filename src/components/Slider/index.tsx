"use client";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { useSlider } from "./hook/useSlider";
import styles from "./style/Slider.module.scss";

interface SliderProps {
  children: React.ReactNode[];
  className?: string;
  transitionDuration?: number;
  left?: React.ReactNode;
  right?: React.ReactNode;
  navPosition?: "top" | "bottom";
  height?: number;
  width?: number;
  smallHeight?: number;
  smallWidth?: number;
}

export const Slider: React.FC<SliderProps> = ({
  children,
  className,
  transitionDuration,
  left,
  right,
  navPosition = "bottom",
  height = 300,
  width = 500,
  smallWidth = 300,
  smallHeight = 250,
}) => {
  const container = useRef<HTMLDivElement>();
  
  const [dim, setDim] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if(children.length < 3) throw new Error('El componente Slider requiere un mínimo de tres diapositivas para su correcto funcionamiento');
    setDim(() => {
      return {
        height: !mediaQuery() ? height : smallHeight,
        width: !mediaQuery() ? width : smallWidth,
      };
    });
  }, []);
  
  const { next, back, disableBtn } = useSlider({
    container,
    transitionDuration,
    slideWidth: dim.width,
  });
  function mediaQuery(): boolean {
    if (typeof window !== undefined) {
      return window.matchMedia("(max-width: 700px)").matches;
    } else return false;
  }

  return (
    <section
      className={className ?? ""}
      style={{ 
        height: dim.height, 
        width: dim.width,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {navPosition === "top" && (
        <NavButton
          back={back}
          next={next}
          disableBtn={disableBtn}
          left={left}
          right={right}
        />
      )}
      <div
        className={styles.slider}
        style={{width: dim.width, overflow: "hidden" , flexGrow: '1'}}
      >
        <section
          ref={container as LegacyRef<HTMLDivElement>}
          className={styles.slider__container}
          style={{ minWidth: dim.width }}
        >
          {children.map((child, indx) => (
            <article
              key={`slide-child-${indx}`}
              className={styles.slider__container__slide}
              style={{ minWidth: dim.width }}
            >
              {child}
            </article>
          ))}
        </section>
      </div>
      {navPosition === "bottom" && (
        <NavButton
          back={back}
          next={next}
          disableBtn={disableBtn}
          left={left}
          right={right}
        />
      )}
    </section>
  );
};

interface NavButtonProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  back: () => void;
  next: () => void;
  disableBtn: boolean;
}
const NavButton: React.FC<NavButtonProps> = ({
  back,
  next,
  left,
  right,
  disableBtn,
}) => {
  return (
    <nav className={styles.slider__nav}>
      <button
        className={styles.slider__nav__btn}
        onClick={back}
        disabled={disableBtn}
      >
        {left ?? "←"}
      </button>
      <button
        className={styles.slider__nav__btn}
        onClick={next}
        disabled={disableBtn}
      >
        {right ?? "→"}
      </button>
    </nav>
  );
};
