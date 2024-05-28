import styled from "styled-components";
import Header from "../components/Header";
import ChartInputData from "../components/ChartInputData";
import Chart1 from "../components/Chart1";
import Chart2 from "../components/Chart2";
import HbA1c from "../components/HbA1c";
import Helper from "../components/Helper";

function ChartsPage() {
  return (
    <>
      <Header />
      <Wrapper>
        <div className="line1">
          <ChartInputData />
          <Chart1 />
          <HbA1c />
        </div>
        <div className="line2">
          <Chart2 />
          <Helper />
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  .line1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin: 10px;
  }
  .line2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 10px;
  }
  @media (min-width: 576px) {
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 992px) {
    padding: 30px;

    .line1 {
      flex-direction: row;
      justify-content: space-around;

      margin: 20px;
    }
    .line2 {
      flex-direction: row;
      justify-content: space-between;
      margin: 20px;
    }
  }
  @media (min-width: 1200px) {
  }
  @media (min-width: 1400px) {
  }
`;
export default ChartsPage;
