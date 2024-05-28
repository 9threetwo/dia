import { useEffect, useState } from "react";
import styled from "styled-components";

function ToggleGender({ passGender, def }) {
  const [gender, setGender] = useState(def);

  useEffect(() => {
    passGender(gender);
  }, [gender]);

  return (
    <Wrapper>
      <div className="toggle">
        <p
          className={gender === "m" ? "letter active" : "letter"}
          onClick={() => setGender("m")}
        >
          M
        </p>
        <div className="hr"></div>
        <p
          className={gender === "f" ? "letter active" : "letter"}
          onClick={() => setGender("f")}
        >
          Ж
        </p>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 300px;
  justify-content: flex-end;
  align-items: center;
  font-family: "Courier New", Courier, monospace;
  .gender {
    color: var(--blue-0);
    font-size: 20px;
    font-weight: 100;
    line-height: 18px;
    width: max-content;
    font-style: normal;
    padding: 8px;
  }
  .letter {
    width: 33px;
    height: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 300;
    transition: 0.5s;
    color: var(--blue-0);

    &:hover {
      background: white;
      box-shadow: -2px 0px 7.3px 0px rgba(0, 0, 0, 0.25);
      font-weight: 700;
    }
  }

  .toggle {
    width: 80px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 2px;
    .hr {
      width: 2px;
      height: 23px;
      margin: 5px;
      border-radius: 8px;
      box-shadow: -2px 0px 7.3px 0px rgba(0, 0, 0, 0.25);
      background: var(--blue-2);
    }
    .active {
      background: white;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
      font-weight: 600;
    }
  }
  .light-text {
    font-weight: 100;
    font-style: thin;
    font-style: italic;
    font-style: normal;
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
export default ToggleGender;
