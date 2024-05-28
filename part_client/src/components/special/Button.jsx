import styled from "styled-components";
import React from "react";
import { useSelector } from "react-redux";

const Button = ({ text, onClick, width, type, height }) => {
  return (
    <Wrapper width={width} height={height}>
      <button onClick={onClick} type={type}>
        {text}
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  button {
    z-index: 1;
    position: relative;
    font-size: inherit;
    font-family: inherit;
    color: white;
    padding: 3px 5px;
    outline: none;
    border: none;
    background: var(--blue-0);
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    width: ${(props) => (props.width ? props.width : "max-content")};
    height: ${(props) => (props.height ? props.height : "40px")};
    &:hover {
      cursor: pointer;
    }

    &::before {
      content: "";
      z-index: -1;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--blue-0);
      transform-origin: center;
      transform: scale(1);
      border-radius: 8px;
    }

    &:hover::before {
      transition: all 0.75s ease-in-out;
      transform-origin: center;
      transform: scale(1.75);
      opacity: 0;
      border-radius: 8px;
    }
  }

  @media (min-width: 576px) {
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 992px) {
  }
  @media (min-width: 1140px) {
  }
  @media (min-width: 1340px) {
  }
`;
export default Button;
