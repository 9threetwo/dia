import { useState } from "react";
import Button from "../components/special/Button";
import Input from "../components/special/Input";
import InputTime from "./special/InputTime";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import toast from "react-hot-toast";
import { saveData } from "..//features/userSlice";
import { messageHandler2 } from "../features/userSlice";

const initialState = {
  date: "",
  time: "",
  ck: "",
  xe: "",
  insulin: "",
  comment: "",
};

function ChartInputData() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [values, setValues] = useState(initialState);

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const saveDataHandler = () => {
    const { date, time, ck, xe, insulin, comment } = values;
    if (!date || !time || !ck) {
      return toast.error("Введите все значения");
    }
    if (ck < user.min) {
      dispatch(
        messageHandler2(
          "Не вводите инсулин до нормального уровня ГК. Срочно повысьте СК!"
        )
      );
    }
    if (ck > user.min) {
      dispatch(messageHandler2("Уровень ГК в пределах нормы."));
    }
    if (ck >= user.max & ck <= 13.0) {
      dispatch(messageHandler2("Наблюдайте за уровнем ГК в течении 1-1,5ч !"));
    }
    if (ck > 13.0) {
      dispatch(messageHandler2("Высокий уровень ГК! Срочно введите инсулин! При ухудшении обратитесь к врачу!"));
    }
    dispatch(
      saveData({ date, time, ck, xe, insulin, comment, userId: user._id })
    );
  };

  return (
    <Wrapper>
      <div className="in">
        <p>Дата</p>
        <Input
          height="30px"
          width="150px"
          type="date"
          name="date"
          value={values.date}
          onChange={changeHandler}
          autoComplete="off"
        />
      </div>
      <div className="in">
        <p>Время</p>
        <InputTime
          height="30px"
          width="150px"
          type="time"
          name="time"
          value={values.time}
          onChange={changeHandler}
          autoComplete="off"
        />
      </div>
      <div className="in">
        <p>СК</p>
        <Input
          height="30px"
          width="150px"
          type="number"
          name="ck"
          value={values.ck}
          onChange={changeHandler}
          autoComplete="off"
        />
      </div>
      <div className="in">
        <p>XE</p>
        <Input
          height="30px"
          width="150px"
          type="number"
          name="xe"
          value={values.xe}
          onChange={changeHandler}
          autoComplete="off"
        />
      </div>
      <div className="in">
        <p>Инсулин</p>
        <Input
          height="30px"
          width="150px"
          type="number"
          name="insulin"
          value={values.insulin}
          onChange={changeHandler}
          autoComplete="off"
        />
      </div>
      <div className="in">
        <p>Комментарий</p>
        <Input
          height="30px"
          width="150px"
          type="text"
          name="comment"
          value={values.comment}
          onChange={changeHandler}
          autoComplete="off"
        />
      </div>
      <div className="actions">
        <Button text="Добавить" onClick={saveDataHandler} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  .in {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
    margin: 5px 0;
    p {
      font-size: 14px;
    }
  }
  .actions {
    width: 300px;
    display: flex;
    justify-content: center;
    margin: 10px 0;
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
export default ChartInputData;
