import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import img01 from "./slider/slider01.jpg";
import img02 from "./slider/slider02.jpg";
import img03 from "./slider/slider03.jpg";
import img04 from "./slider/slider04.jpg";
import img05 from "./slider/slider05.jpg";
import img06 from "./slider/slider06.jpg";

import "./test.css";

const images = [img01, img02, img03, img04, img05, img06];

export const Carousel = () => {
  // New Carousel
  const slidePresentationTime = 5000; // after how many ms slide will change - now 3s / 3000ms
  const [currentSlide, setCurrentSlide] = useState(0);
  let sliderInterval = useRef() as any; // interval ref
  //

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    sliderInterval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % images.length); // change current slide to next after 3s
    }, slidePresentationTime);
    return () => {
      clearInterval(sliderInterval);
    };
  });
  return (
    <>
      <div>
        {images.map((image, index) => (
          <img
            alt="bg"
            key={index}
            className={index === currentSlide ? "image active" : "image"}
            src={image}
            style={{
              zIndex: `-${index + 1}`,
            }}
          />
        ))}
      </div>
    </>
  );
};
