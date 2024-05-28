import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../features/userSlice";
import toast from "react-hot-toast";
import Input from "../components/special/Input";
import Button from "../components/special/Button";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const { user, isLoading } = useSelector((store) => store.user);
  const [values, setValues] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Введите все значения");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleMemberHandler = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      navigate("/user-area");
    }
  }, [user]);

  return (
    <div>
      <Wrapper>
        <form className="form" onSubmit={onSubmit}>
          <h3>{values.isMember ? "Авторизация" : "Регистрация"}</h3>

          <div className="input-content">
            {!values.isMember && (
              <div className="in">
                <Input
                  height="40px"
                  placeholder="Имя"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={changeHandler}
                  autoComplete="off"
                />
              </div>
            )}
            <div className="in">
              <Input
                height="40px"
                placeholder="почта"
                type="text"
                name="email"
                value={values.email}
                onChange={changeHandler}
              />
            </div>
            <div className="in">
              <Input
                height="40px"
                placeholder="пароль"
                type="password"
                name="password"
                value={values.password}
                onChange={changeHandler}
                autoComplete="off"
              />
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <p className="asq">
              {values.isMember ? "Нет регистрации? " : "Есть регистрация? "}
              <button
                type="button"
                onClick={toggleMemberHandler}
                className="member-btn"
              >
                {values.isMember ? " Регистрация" : "Авторизация"}
              </button>
            </p>
          </div>
          <div className="actions">
            <Button
              type="submit"
              className="btn button-form"
              disabled={isLoading}
              text={isLoading ? "Думаю ..." : "Подтвердить"}
              width="150px"
              height="40px"
            />
          </div>
        </form>
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 150px;

  .in {
    margin: 10px 0;
  }
  .header {
    text-align: center;
    margin: 10px;
  }
  .input-content {
    text-align: center;
  }
  h3 {
    color: var(--blue-0);
    text-align: center;
  }
  button {
    font-size: 16px;
    font-weight: 600;
  }
  .actions {
    text-align: center;
    margin: 20px;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--blue-2);
    cursor: pointer;
    font-size: 14px;
    font-family: "Montserrat Alternates", sans-serif;

    &:hover {
      text-decoration: underline;
    }
  }
  .asq {
    font-size: 14px;
  }
  @media (min-width: 992px) {
  }
`;
export default Register;
