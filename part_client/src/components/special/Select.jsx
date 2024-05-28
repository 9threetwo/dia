import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { motion, AnimatePresence } from "framer-motion";

const animations = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const Select = ({ objects, passState, def }) => {
  const [state, setState] = useState(def);
  const [arrow, setArrow] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [filteredTarifs, setFilteredTarifs] = useState(objects);

  useEffect(() => {
    const filteredObjects = objects?.filter((t) =>
      t?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTarifs(filteredObjects);
  }, [searchQuery, objects]);

  useEffect(() => {
    if (arrow) {
      const filteredObjects = objects.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTarifs(filteredObjects);
    }
  }, [arrow]);

  const wrapperRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setArrow(false);
    }
  };

  useEffect(() => {
    if (arrow) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [arrow]);

  useEffect(() => {
    passState(state);
    setSearchQuery("");
  }, [state]);

  const arrowHandler = () => {
    setArrow(!arrow);
  };

  const itemHandler = (e) => {
    setState(e.target.textContent);
    setArrow(false);
  };
  return (
    <Wrapper ref={wrapperRef}>
      {arrow && (
        <input
          className={
            searchQuery.length > 0
              ? "clue-input"
              : "clue-input clue-input-transparent"
          }
          type="text"
          autoFocus
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      )}

      <div
        className={arrow ? "select select_active" : "select"}
        onClick={arrowHandler}
      >
        <p className="city">{state}</p>
        <div className="icon">
          {arrow === false && <VscChevronDown className="svg_false" />}
          {arrow === true && <VscChevronUp className="svg_true" />}
        </div>
      </div>
      <AnimatePresence>
        {arrow === true && (
          <motion.div
            className="menu"
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <div className="menu2">
              {filteredTarifs.map((o) => (
                <p className="item" key={Math.random()} onClick={itemHandler}>
                  {o.name}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  .clue {
    position: absolute;
    top: -25px;
    left: 5px;
    background: var(--blue-3);
    z-index: 20;
  }
  .clue-input {
    position: absolute;
    top: -19px;
    left: 5px;
    background: var(--blue-3);
    z-index: 20;
    border: none;
    padding: 2px;
    border-radius: 5px;
    width: auto;
    width: 10ch;
    caret-color: transparent;
    &:focus {
      outline: none;
    }
  }
  .clue-input-transparent {
    background: transparent;
    width: auto;
    width: 10ch;
  }
  .select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border: 2px solid var(--blue-0);
    width: 230px;
    height: 40px;
    border-radius: 5px;
    transition: 1s;
    cursor: pointer;
    .city {
      font-size: 13px;
    }
    :hover {
      /* background-color: var(--blue-3); */
    }
  }
  .select_active {
    background-color: var(--blue-3);
  }
  .city {
    margin: 0;
    letter-spacing: 0.1rem;
    font-size: 14px;
  }

  .icon {
  }
  svg {
    font-size: 1.3rem;
    margin-top: 0.4rem;
    cursor: pointer;
  }
  .svg_false {
    color: var(--blue-1);
  }
  .svg_true {
    color: var(--blue-1);
  }
  .menu {
    /* margin-right: 0.5rem; */
    /* padding-right: 0.5rem; */
    display: flex;
    justify-content: center;
    position: absolute;
    border-radius: 5px;
    border-left: 2px solid var(--blue-0);
    border-right: 2px solid var(--blue-0);
    border-bottom: 2px solid var(--blue-0);
    width: 230px;
    max-height: 200px;
    background-color: white;
    z-index: 2;

    p {
      margin: 0;
    }
    .item {
      cursor: pointer;
      margin-top: 0.4rem;
      margin-bottom: 0.4rem;
      padding-left: 1rem;
      transition: 1s;
      font-size: 14px;
      &:hover {
        background-color: var(--blue-3);
      }
    }
  }
  .menu2 {
    width: 290px;
    overflow: auto;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      /* box-shadow: inset 0 0 5px var(--purple-1); */

      border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--purple-1);
      border-radius: 10px;
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
export default Select;
