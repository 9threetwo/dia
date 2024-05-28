import { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Input from "../components/special/Input";
import ToggleGender from "../components/ToggleGender";
import Button from "../components/special/Button";
import Select from "../components/special/Select";
import { useSelector, useDispatch } from "react-redux";
import { editUserData } from "../features/userSlice";
import toast from "react-hot-toast";

const data = [
  { name: "I тип: инсулинозависимый" },
  { name: "II тип: неинсулинозависимый" },
  { name: "Предиабет" },
  { name: "Гестационный СД" },
];

const data2 = Array.from({ length: 100 }, (_, i) => ({
  name: (i + 1).toString(),
}));

function PersonalAreaPage() {
  const { user } = useSelector((store) => store.user);
  const dateOfB = user?.date ? new Date(user.date) : null;
  const formattedDate =
    dateOfB && !isNaN(dateOfB.getTime())
      ? dateOfB.toISOString().split("T")[0]
      : "";

  const dispatch = useDispatch();

  const initialState = {
    name: user?.name || "",
    gender: "",
    date: formattedDate || "",
    medicine: user?.medicine || "",
    complication: user?.complication || "",
    min: user?.min || "",
    max: user?.max || "",
    weight: user?.weight || "",
  };

  const [values, setValues] = useState(initialState);

  const [gender, setGender] = useState("");
  const genderHandler = (g) => {
    setGender(g);
  };

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [type, setType] = useState();
  const typeHandler = (t) => {
    setType(t);
  };

  const [experience, setExperience] = useState();
  const experienceHandler = (t) => {
    setExperience(t);
  };

  const handleUserData = () => {
    if (!values.min || !values.max) {
      return toast.error("Введите целевой диапазон");
    }
    dispatch(
      editUserData({
        name: values.name,
        gender: gender,
        date: values.date,
        weight: values.weight,
        type: type,
        experience: experience,
        medicine: values.medicine,
        complication: values.complication,
        userId: user._id,
        min: values.min,
        max: values.max,
      })
    );
  };

  return (
    <>
      <Header />
      <Wrapper>
        <div className="in">
          <p>ФИО</p>
          <Input
            height="40px"
            width="230px"
            type="text"
            name="name"
            value={values.name}
            onChange={changeHandler}
            autoComplete="off"
          />
        </div>
        <div className="in">
          <p>Дата рождения</p>
          <Input
            height="40px"
            width="230px"
            type="date"
            name="date"
            value={values.date}
            onChange={changeHandler}
            autoComplete="off"
          />
        </div>
        <div className="in">
          <p>Пол</p>
          <ToggleGender passGender={genderHandler} def={user?.gender} />
        </div>
        <div className="in">
          <p>Вес</p>
          <Input
            height="40px"
            width="230px"
            type="number"
            name="weight"
            value={values.weight}
            onChange={changeHandler}
            autoComplete="off"
          />
        </div>
        <div className="in">
          <p>Тип</p>
          <Select
            objects={data}
            def={user?.type ? user.type : ""}
            passState={typeHandler}
          />
        </div>
        <div className="in">
          <p>Стаж заболевания</p>
          <Select
            objects={data2}
            def={user?.experience ? user.experience : ""}
            passState={experienceHandler}
          />
        </div>
        <div className="in">
          <p>Лекарство</p>
          <Input
            height="40px"
            width="230px"
            type="text"
            name="medicine"
            value={values.medicine}
            onChange={changeHandler}
            autoComplete="off"
          />
        </div>
        <div className="in">
          <p>Осложнения</p>
          <Input
            height="40px"
            width="230px"
            type="text"
            name="complication"
            value={values.complication}
            onChange={changeHandler}
            autoComplete="off"
          />
        </div>
        <div className="in">
          <p>Целевой диапазон</p>
          <div className="input-block">
            <Input
              height="40px"
              width="90px"
              type="number"
              name="min"
              placeholder="мин"
              value={values.min}
              onChange={changeHandler}
              autoComplete="off"
            />
            <Input
              height="40px"
              width="90px"
              name="max"
              type="number"
              placeholder="макс"
              value={values.max}
              onChange={changeHandler}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="action">
          <Button text="Сохранить" onClick={handleUserData} />
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .in {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 350px;
    justify-content: space-between;
    margin: 10px 0;
    p {
      font-size: 16px;
    }
    .input-block {
      display: flex;
      width: 200px;
      justify-content: space-between;
    }
  }
  .action {
    margin: 30px;
  }
  @media (min-width: 576px) {
  }
  @media (min-width: 768px) {
    margin: 30px;
    .in {
      max-width: 500px;
    }
  }
  @media (min-width: 992px) {
  }
  @media (min-width: 1200px) {
  }
  @media (min-width: 1400px) {
  }
`;
export default PersonalAreaPage;
