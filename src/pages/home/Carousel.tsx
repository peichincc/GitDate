import React, { useState, useEffect, useRef } from "react";
import img01 from "../../assets/images/slider/slider01.jpg";
import img02 from "../../assets/images/slider/slider02.jpg";
import img03 from "../../assets/images/slider/slider03.jpg";
import img04 from "../../assets/images/slider/slider04.jpg";
import img05 from "../../assets/images/slider/slider05.jpg";
import img06 from "../../assets/images/slider/slider06.jpg";
import "./carousel.css";

const images = [img01, img02, img03, img04, img05, img06];

export const Carousel = () => {
  const slidePresentationTime = 5000;
  const [currentSlide, setCurrentSlide] = useState(0);
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
