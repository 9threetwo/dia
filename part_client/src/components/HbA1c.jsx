import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { subMonths, parseISO, isAfter } from "date-fns";
import { messageHandler } from "../features/userSlice";

function HbA1c() {
  const { chartData } = useSelector((store) => store.user);
  const [average, setAverage] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      const threeMonthsAgo = subMonths(new Date(), 3);

      const filteredData = chartData.filter((item) => {
        const itemDate = parseISO(item.createdAt);
        return isAfter(itemDate, threeMonthsAgo);
      });

      const ckValues = filteredData.map((item) => ({
        ...item,
        ck: parseFloat(item.ck),
      }));

      const averageCk = _.meanBy(ckValues, "ck");
      setAverage(averageCk);
    }
  }, [chartData]);

  useEffect(() => {
    if (average < 7.5) {
      dispatch(messageHandler("HbA1c в пределах нормы."));
    }
    if (average > 7.5) {
      dispatch(
        messageHandler(
          "HbA1c удовлетворительный. Рекомендуется проконсультироваться с врачом!"
        )
      );
    }
    if (average > 9) {
      dispatch(messageHandler("HbA1c плохой. Срочно обратитесь к врачу!"));
    }
  }, [average]);

  return (
    <Wrapper>
      <p>HbA1c: {average?.toFixed(1)}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 0;
  p {
    margin: 50px 0;
    font-size: 25px;
    font-weight: 500;
    border-bottom: 2px solid black;
    padding: 5px;
  }
  @media (min-width: 576px) {
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 992px) {
    height: 300px;
  }
  @media (min-width: 1200px) {
  }
  @media (min-width: 1400px) {
  }
`;

export default HbA1c;
