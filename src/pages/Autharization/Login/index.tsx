import { SubmitHandler, useForm } from "react-hook-form";

import { ILoginField } from "./types";

import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { welcome__message, success__login__message } from "../../../messages";

import axios from "axios";

import { LOGIN_URL } from "../../../server/serverLink";

import styles from "../index.module.scss";
import { Header } from "../../../components";

welcome__message();

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginField>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ILoginField> = (data) => {
    axios
      .post(LOGIN_URL, {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.access);
          localStorage.setItem("refresh", res.data.refresh);
          success__login__message();
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        }
      })
      .catch((error: any) => {
        if (error.response.data.password) {
          toast.error(error.response.data.password, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeButton: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (error.response.data.username) {
          toast.error(error.response.data.username, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeButton: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (error.response.data.error) {
          toast.error(error.response.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeButton: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
    reset();
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.form__container}>
        <h2>Вход</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <hr />
          <div className={styles.form__div}>
            <input
              {...register("username", {
                required: "Ник обязательное поле",
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
              {...register("password", {
                required: "Пароль обязательное поле",
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
            <p>
              Забыли пароль ? <Link to="/reset-password">Восстановить</Link>
            </p>
          </div>
          <button>Войти</button>
          <ToastContainer />
          <div className={styles.text}>
            <p>
              Нет аккаунта ? <Link to="/registration">Регистрация</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

// Kolya_2005
// Kolya_200510
