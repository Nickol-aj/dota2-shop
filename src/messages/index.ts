import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const welcome__message = () => {
  toast.info("Добро пожаловать !", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeButton: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const success__login__message = () => {
  toast.success("Успешная авторизация !", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeButton: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const email__letter__message = () => {
  toast.success("На вашу почту отправлено письмо для потверждения аккаунта !", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeButton: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const error__message = () => {
  toast.error("Произошла ошибка !", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeButton: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};