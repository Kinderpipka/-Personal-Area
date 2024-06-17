import React, { useState } from "react";
import "./registration.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateField } from "../../redux/features/regSlice";
import { RootState } from "../../redux/store";
import { FormFields } from "../../redux/features/regSlice";
function Registration() {
  const formData = useSelector((state: RootState) => state.formData);

  const dispatch = useDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    if (name in formData) {
      dispatch(updateField({ field: name as keyof typeof formData, value }));
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isAllFieldsFilled = Object.values(formData).every(
      (field) => field.trim() !== ""
    );
    if (!isAllFieldsFilled) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }
    localStorage.setItem("formData", JSON.stringify(formData));

    navigate("/");
  }

  let navigate = useNavigate();

  return (
    <div>
      <div className="reg_container">
        <form className="reg_form" onSubmit={handleSubmit}>
          <h2 className="reg_h2">Регистрация</h2>
          <div className="reg_imput1">
            <label className="reg_label">Имя</label>
            <br />
            <input
              className="reg_input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="reg_imput1">
            <label className="reg_label">Электронная почта</label>
            <br />
            <input
              className="reg_input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="reg_imput1">
            <label className="reg_label">Пароль</label>
            <br />
            <input
              className="reg_input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="reg_imput1">
            <label className="reg_label">Подтвердить пароль</label>
            <br />
            <input
              className="reg_input"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="reg_button">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}
export default Registration;
