import styled from "styled-components";
import { useSelector } from "react-redux";

function Helper() {
  const { message, message2 } = useSelector((store) => store.user);
  return (
    <Wrapper>
      <p className="header">Помощник</p>
      <p className="message">{message2}</p>
      <p className="message">{message}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid var(--blue-3);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background: white;
  font-size: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  .message {
    flex-grow: 1;
    margin: 10px;
    font-size: 16px;
  }
  .header {
    font-weight: 700;
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
export default Helper;
