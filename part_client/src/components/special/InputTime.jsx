import React from "react";
import styled from "styled-components";

const InputTime = ({
  type,
  placeholder,
  value,
  name,
  onChange,
  autoComplete,
  width,
  height,
}) => {
  return (
    <Wrapper width={width} height={height}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        autoComplete={autoComplete}
        step="60"
      />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  input {
    box-sizing: border-box;
    padding: 5px;
    border: none;
    background: var(--gray-background);
    font-size: 100%;
    border-radius: 10px;
    border: 1px solid var(--gray-border);
    width: ${(props) => (props.width ? props.width : "300px")};
    height: ${(props) => (props.height ? props.height : "60px")};
    transition: 0.5s;

    ::placeholder {
      color: var(--gray-dark);
      transition: 0.6s;
    }
    &::placeholder {
      font-size: 13px;
    }

    :focus-visible {
      outline: none;
      box-shadow: 0px 0px 5px 0px var(--blue-0);
      border: 1px solid var(--blue-0);
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
export default InputTime;
