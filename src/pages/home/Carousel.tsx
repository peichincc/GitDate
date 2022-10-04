import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import img01 from "../../assets/images/slider/slider01.jpg";
import img02 from "../../assets/images/slider/slider02.jpg";
import img03 from "../../assets/images/slider/slider03.jpg";
import img04 from "../../assets/images/slider/slider04.jpg";
import img05 from "../../assets/images/slider/slider05.jpg";
import img06 from "../../assets/images/slider/slider06.jpg";

const images = [img01, img02, img03, img04, img05, img06];

interface Props {
  currentSlide: number;
  index: number;
}

const Image = styled.img<Props>`
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  display: block;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  transition: opacity 1s ease;
  opacity: ${(props) => {
    return props.currentSlide === props.index ? "1" : "0";
  }};
`;

export const Carousel = () => {
  const slidePresentationTime = 5000;
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  let sliderInterval = useRef() as any;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    sliderInterval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % images.length);
    }, slidePresentationTime);
    return () => {
      clearInterval(sliderInterval);
    };
  });
  return (
    <>
      {images.map((image, index: number) => (
        <Image
          alt="bg"
          key={index}
          index={index}
          currentSlide={currentSlide}
          className={index === currentSlide ? "image active" : "image"}
          src={image}
          style={{
            zIndex: `-${index + 1}`,
          }}
        />
      ))}
    </>
  );
};
