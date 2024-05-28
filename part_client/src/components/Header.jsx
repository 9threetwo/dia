import { useState, useRef, useEffect } from "react";
import { TiThMenuOutline } from "react-icons/ti";
import Button from "./special/Button";
import { logOutUser } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Menu from "./Menu";
import { AnimatePresence } from "framer-motion";

function Header() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [isMenu, setIsMenu] = useState(false);

  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsMenu(false);
    }
  };

  useEffect(() => {
    if (isMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenu]);

  return (
    <Wrapper {...{ isMenu }} ref={wrapperRef}>
      <div className="burger" onClick={() => setIsMenu(!isMenu)}>
        <TiThMenuOutline />
      </div>

      <p className="logo">DIA</p>

      <div className="logout">
        <Button
          text="Выйти"
          height="35px"
          onClick={() => dispatch(logOutUser())}
        />
      </div>
      <AnimatePresence mode="wait">
        {isMenu && <Menu closeMenuHandler={() => setIsMenu(false)} />}
      </AnimatePresence>
    </Wrapper>
  );
}

import styled from "styled-components";
const Wrapper = styled.div`
  width: 100vw;
  height: 100px;
  background-color: var(--blue-3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: relative;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  .burger {
    &:hover {
      svg {
        color: var(--blue-0);
        color: ${(props) => (props.isMenu ? "var(--blue-0)" : "")};
      }
    }
    svg {
      font-size: 35px;
      cursor: pointer;
      transition: 0.5s;
      color: var(--blue-2);
    }
  }
  .logo {
    font-size: 35px;
    color: transparent;
    -webkit-text-stroke: 2px var(--blue-0);
    letter-spacing: 5px;
    text-stroke: 1px black;
    font-weight: 800;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  @media (min-width: 576px) {
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 992px) {
    padding: 0 50px;
  }
  @media (min-width: 1200px) {
  }
  @media (min-width: 1400px) {
  }
`;
export default Header;
