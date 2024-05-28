import styled from "styled-components";

function DateTable({ chartData }) {
  return (
    <Wrapper>
      <div className="time">
        {chartData?.map((cd) => (
          <p key={cd._id}>{cd.time}</p>
        ))}
      </div>
      <div className="time">
        {chartData?.map((cd) => (
          <p key={cd._id}>{cd.ck}</p>
        ))}
      </div>
      <div className="time">
        {chartData?.map((cd) => (
          <p key={cd._id}>{cd.xe ? cd.xe : " - "}</p>
        ))}
      </div>
      <div className="time">
        {chartData?.map((cd) => (
          <p key={cd._id}>{cd.insulin ? cd.insulin : " - "}</p>
        ))}
      </div>
      <div className="time">
        {chartData?.map((cd) => (
          <p className="small" key={cd._id}>
            {cd.comment ? cd.comment : " - "}
          </p>
        ))}
      </div>
      <div className="time">
        {chartData?.map((cd) => {
          const ck = cd.ck;
          if (ck > 0 && ck < 4) {
            return (
              <p className="small" key={`${cd._id}-ck`}>
                Не вводите инсулин до нормального уровня ГК. Срочно повысьте СК!
              </p>
            );
          } else if (ck >= 4 && ck <= 10) {
            return (
              <p className="small" key={`${cd._id}-ck`}>
                Уровень ГК в пределах нормы.
              </p>
            );
          } else if (ck > 10) {
            return (
              <p className="small" key={`${cd._id}-ck`}>
                Наблюдайте за уровнем ГК в течении 1-1,5ч !
              </p>
            );
          }
          return null;
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 20px 0;
  padding: 15px;
  width: 200px;
  overflow-x: auto;
  .time {
    display: flex;
  }
  p {
    margin: 10px;
    width: 120px;
    text-align: center;
    flex-wrap: nowrap;
    font-weight: 600;
  }
  .small {
    font-size: 14px;
    font-weight: 400;
  }
  @media (min-width: 576px) {
    width: 400px;
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 992px) {
  }
  @media (min-width: 1200px) {
    width: 700px;
  }
  @media (min-width: 1400px) {
  }
`;
export default DateTable;
