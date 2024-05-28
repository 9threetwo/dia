import styled from "styled-components";
import { FaHome, FaUserAlt, FaChartBar, FaDatabase } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Menu({ closeMenuHandler }) {
  const navigate = useNavigate();

  const userAreaHandler = () => {
    navigate("/user-area");
    closeMenuHandler();
  };
  const personalAreaHandler = () => {
    navigate("/personal-area");
    closeMenuHandler();
  };
  const chartsAreaHandler = () => {
    navigate("/charts");
    closeMenuHandler();
  };
  const dataAreaHandler = () => {
    navigate("/data");
    closeMenuHandler();
  };

  return (
    <Wrapper>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="modal"
      >
        <div className="link" onClick={userAreaHandler}>
          <FaHome />
          <p>Главная</p>
        </div>
        <div className="link" onClick={personalAreaHandler}>
          <FaUserAlt />
          <p>Личный кабинет</p>
        </div>
        <div className="link" onClick={chartsAreaHandler}>
          <FaChartBar />
          <p>Графики</p>
        </div>
        <div className="link" onClick={dataAreaHandler}>
          <FaDatabase />
          <p>Данные</p>
        </div>
      </motion.div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 50px;
  left: 10px;
  width: 250px;
  margin: 10px;
  z-index: 2;
  .modal {
    padding: 15px;
    background: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    .link {
      margin: 10px 0;
      display: flex;
      align-items: end;
      cursor: pointer;
      transition: 0.5s;
      &:hover {
        padding-left: 7px;
      }
      svg {
        font-size: 23px;
        color: var(--blue-0);
      }
      p {
        font-weight: 500;
        margin: 0 10px;
        font-size: 16px;
        color: var(--blue-0);
      }
    }
  }

  @media (min-width: 576px) {
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 992px) {
    top: 50px;
    left: 40px;
  }
  @media (min-width: 1200px) {
  }
  @media (min-width: 1400px) {
  }
`;
export default Menu;
