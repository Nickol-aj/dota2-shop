import React from "react";

import { useNavigate } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";

import { IResetPasswordField } from "./types";

import axios from "axios";

import { RESET_PASSWORD } from "../../../server/serverLink";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import styles from "../index.module.scss";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IResetPasswordField>({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset: SubmitHandler<IResetPasswordField> = async () => {
    try {
      const response = await axios.post(RESET_PASSWORD, formData);
      console.log(response.data);

      setFormData({
        username: "",
        email: "",
      });

      toast.info(response.data.success.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeButton: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error: any) {
      if (error.response.data.error.email) {
        toast.error(error.response.data.email, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeButton: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(error.response.data.error.email);
      } else {
        alert(error.response.data.error);
      }
    }
    reset();
  };

  return (
    <div className={styles.container}>
      <div className={styles.form__container}>
        <h2>Сброс пароля</h2>
        <form onSubmit={handleSubmit(handleReset)}>
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
              onInput={handleChange}
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
              onInput={handleChange}
              className={styles.form__input}
              placeholder=" "
            />
            <label className={styles.form__label}>Email</label>
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>
          <button>Сбросить</button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
