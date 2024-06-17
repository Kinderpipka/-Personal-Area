import React, { useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/features/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).elements.namedItem(
      "email"
    ) as HTMLInputElement;
    const password = (e.target as HTMLFormElement).elements.namedItem(
      "password"
    ) as HTMLInputElement;

    try {
      dispatch(login({ email: email.value, password: password.value }));
      navigate("/home");
    } catch (error) {
      email.classList.add("input-error");
      password.classList.add("input-error");
    }
  };

  function handleRegister() {
    navigate("/reg");
  }

  return (
    <div>
      <div className="auth_container">
        <form className="form" onSubmit={handleLogin}>
          <h2>Вход</h2>
          <div className="imput1">
            <label>Электронная почта</label>
            <br />
            <input className="element" type="email" name="email" />
          </div>
          <div className="imput1">
            <label>Пароль</label>
            <br />
            <input className="element" type="password" name="password" />
          </div>
          <button type="submit">Войти</button>
          <button type="button" onClick={handleRegister}>
            Регистрация
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
