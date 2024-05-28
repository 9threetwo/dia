import { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import TextSlider from "../components/TextSlider";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../features/userSlice";

const texts = [
  `<h3>Термины и их сокращения</h3>
  <p>Сахарный диабет (СД) - нарушение обмена веществ, характеризующееся повышением ГК/СК. Данное заболевание возникает в результате нарушения выработки инсулина в поджелудочной железе, нарушения действия инсулина (нечувствительность или резистентность клеток) или обоих этих факторов.
  Гликемия - уровень глюкозы в крови (ГК)/сахара в крови (СК), измеряемый в ммоль/л (миллимоль на литр, миллимоляр, мМ).
  <span class="highlight">Гипогликемия</span> - острое состояние, при котором ГК/СК опускается ниже 3,5 ммоль/л.
  <span class="highlight">Гипергликемия</span> - повышенный уровень ГК/СК.
  Гликозилированный гемоглобин (гликированный гемоглобин, гликогемоглобин, гемоглобин A1c, HbA1c) - показатель, отражающий среднее значение ГК/СК за предшествующие 3 месяца.
  Углеводные единицы (УЕ) (1 УЕ = 10 г).
  Хлебная единица (ХЕ) (1 ХЕ = 12 г).
  Углеводная порция (УП) (1 УП = 15 г).</p>`,
  "DIA - Ваш помощник в управлении сахарным диабетом!",
];

function UserAreaPage() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData({ userId: user._id }));
  }, [user._id]);

  return (
    <>
      <Header />
      <Wrapper>
        <TextSlider texts={texts} />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin: 20px;
    text-align: justify;
  }

  h3 {
    width: 100%;
    text-align: center;
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

export default UserAreaPage;
