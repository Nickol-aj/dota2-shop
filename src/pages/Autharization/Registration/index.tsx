import { SubmitHandler, useForm } from "react-hook-form";

import { IRegisterField } from "./types";

import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  welcome__message,
  error__message,
  email__letter__message,
} from "../../../messages";

import axios from "axios";

import { REGISTRATION_URL } from "../../../server/serverLink";

import styles from "../index.module.scss";

welcome__message();

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterField>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IRegisterField> = (data) => {
    axios
      .post(REGISTRATION_URL, {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.status === 200) {
          email__letter__message();
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        }
      })
      .catch(() => {
        error__message();
      });
    reset();
  };

  return (
    <div className={styles.container}>
      <div className={styles.form__container}>
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <hr />
          <div className={styles.form__div}>
            <input
              {...register("username", {
                required: "Ник обязательное поле",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*_\-])[a-zA-Z0-9!@#$%&*_\-]+$/,
                  message: "Пример : User_1234",
                },
              })}
              type="text"
              className={styles.form__input}
              placeholder=" "
            />
            <label className={styles.form__label}>Ник</label>
            {errors.username && (
              <span className={styles.error}>{errors.username.message}</span>
            )}
          </div>
          <div className={styles.form__div}>
            <input
              {...register("email", {
                required: "Email обязательное поле",
                pattern: {
                  value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                  message: "Неверный адрес",
                },
              })}
              type="email"
              className={styles.form__input}
              placeholder=" "
            />
            <label className={styles.form__label}>Email</label>
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.form__div}>
            <input
              {...register("password", {
                required: "Пароль обязательное поле",
                minLength: {
                  value: 10,
                  message: "Короткий пароль",
                },
              })}
              type="password"
              className={styles.form__input}
              placeholder=" "
            />
            <label className={styles.form__label}>Пароль</label>
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>
          <div className={styles.text}>
            <input type="checkbox" />
            <p>
              Я прочитал(-а){" "}
              <Link to="/user-agreement">пользовательское соглашение</Link> и
              соглашаюсь с условиями
            </p>
          </div>
          <button>Регистрация</button>
          <ToastContainer />
          <div className={styles.text}>
            <p>
              Уже есть аккаунт ? <Link to="/login">Войти</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
