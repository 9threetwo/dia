import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import styled from "styled-components";
import parse from "html-react-parser";

const TextSlider = ({ texts }) => {
  return (
    <StyledAliceCarousel
      autoPlay
      autoPlayInterval={100000}
      infinite
      disableButtonsControls
      disableDotsControls={false}
      renderDotsItem={renderDotsItem}
    >
      {texts.map((text, index) => (
        <Slide key={index}>
          {/* <p>{text}</p> */}
          <p>{parse(text)}</p>
        </Slide>
      ))}
    </StyledAliceCarousel>
  );
};

const renderDotsItem = ({ isActive }) => <Dot isActive={isActive} />;

const StyledAliceCarousel = styled(AliceCarousel)`
  width: 100%;
  height: 100%;

  .alice-carousel__dots {
    display: flex;
    justify-content: center;
    padding-top: 10px;
    cursor: pointer;
  }

  .alice-carousel__dots-item {
    background: #ccc;
    width: 12px;
    height: 12px;
    margin: 0 5px;
    border-radius: 50%;
    transition: background 0.3s;
  }

  .alice-carousel__dots-item.__active {
    background: #007bff;
  }
`;

const Slide = styled.div`
  display: flex;
  justify-content: center;
  height: 500px;
  padding: 20px;
  overflow-y: auto;
  p {
    font-size: 16px;
    font-weight: 500;
    text-align: start;
    margin: 20px;
    white-space: pre-wrap;
  }
  @media (min-width: 576px) {
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 992px) {
  }
  @media (min-width: 1200px) {
  }
  @media (min-width: 1400px) {
  }
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  margin: 0 5px;
  border-radius: 50%;
  background: ${({ isActive }) => (isActive ? "var(--blue-0)" : "#ccc")};
  transition: background 0.3s;
`;

export default TextSlider;
