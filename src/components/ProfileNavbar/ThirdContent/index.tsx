import React from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { addTokenToHeader } from "../../../server/utils";

import {
  PER_CABINET,
  CHANGE_PASSWORD,
  BASE_URL,
} from "../../../server/serverLink";

import { ToastContainer, toast } from "react-toastify";

import { error__message } from "../../../messages";

import styles from "../ThirdContent/index.module.scss";

interface IUser {
  cash: number;
  photo: string;
  last_name: string;
  first_name: string;
  username: string;
  email: string;
}

const ThirdContent = () => {
  const [userData, setUserData] = React.useState<IUser>({
    cash: 0,
    photo: "",
    last_name: "",
    first_name: "",
    username: "",
    email: "",
  });
  const [editedFirstName, setEditedFirstName] = React.useState("");
  const [editedLastName, setEditedLastName] = React.useState("");

  const isAuthenticated = localStorage.getItem("accessToken");

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        addTokenToHeader(isAuthenticated);
        const userDataResponse = await axios.get(PER_CABINET);
        setUserData(userDataResponse.data.user);
        setEditedFirstName(userDataResponse.data.user.first_name);
        setEditedLastName(userDataResponse.data.user.last_name);
      } catch (error) {
        error__message();
      }
    };
    fetchUserData();
    window.scrollTo(0, 0);
  }, [isAuthenticated]);

  const handleAddPhoto = async () => {
    try {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.addEventListener("change", async (event: any) => {
        const file = event.target.files[0];
        if (file) {
          // Создать объект формы данных
          const formData = new FormData();
          formData.append("photo", file);

          addTokenToHeader(isAuthenticated);
          const response = await axios.patch(PER_CABINET, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setUserData((prevUserData) => ({
            ...prevUserData,
            photo: response.data.photoUrl,
          }));
          window.location.reload();
        }
      });
      fileInput.click();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveChanges = async (e: any) => {
    e.preventDefault();
    try {
      addTokenToHeader(isAuthenticated);
      const res = await axios.patch(PER_CABINET, {
        first_name: `${editedFirstName}`,
        last_name: `${editedLastName}`,
      });
      toast.success(res.data.success.updated, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeButton: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      window.location.reload();
    } catch (error) {
      error__message();
    }
  };

  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    old_password: "",
    new_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.patch(CHANGE_PASSWORD, formData);

      setFormData({
        old_password: "",
        new_password: "",
      });

      toast.success(response.data.message.message, {
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
      if (error.response.data) {
        const errorFields = Object.keys(error.response.data);

        errorFields.forEach((field) => {
          const errorMessage = error.response.data[field];
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeButton: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
      }
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.item} id={styles.item__1}>
          <h3>Фото</h3>
          <div className={styles.photo__container}>
            {userData.photo ? (
              <>
                <img src={BASE_URL + userData.photo} alt="" />
                <button onClick={handleAddPhoto}>Сменить фото</button>
              </>
            ) : (
              <>
                <img src={BASE_URL + userData.photo} alt="" />
                <button onClick={handleAddPhoto}>Добавить фото</button>
              </>
            )}
          </div>
        </div>
        <div className={styles.item} id={styles.item__2}>
          <h3>Личные данные</h3>
          <div className={styles.form__container}>
            <form className={styles.personal__info}>
              <div className={styles.user__data}>
                <p>Фамилия</p>
                {editedLastName !== null ? (
                  <input
                    type="text"
                    value={editedLastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                    placeholder={editedLastName}
                  />
                ) : (
                  <input type="text" placeholder="" />
                )}
              </div>
              <div className={styles.user__data}>
                <p>Имя</p>
                {editedFirstName !== null ? (
                  <input
                    type="text"
                    value={editedFirstName}
                    onChange={(e) => setEditedFirstName(e.target.value)}
                    placeholder={editedFirstName}
                  />
                ) : (
                  <input type="text" placeholder="" />
                )}
              </div>
              <div className={styles.user__data}>
                <p>Ник</p>
                <input type="text" placeholder={userData.username} />
              </div>
              <div className={styles.user__data}>
                <p>Email</p>
                <input type="text" placeholder={userData.email} />
              </div>
              <button onClick={handleSaveChanges}>Сохранить</button>
            </form>
          </div>
        </div>
        <div className={styles.item} id={styles.item__3}>
          <h3>Смена пароля</h3>
          <div className={styles.form__container}>
            <form className={styles.change__password} onSubmit={handleSubmit}>
              <div className={styles.user__data}>
                <p>Введите старый пароль</p>
                <input
                  type="password"
                  name="old_password"
                  value={formData.old_password}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>
              <div className={styles.user__data}>
                <p>Введите новый пароль</p>
                <input
                  type="password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>
              <button>Сохранить</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ThirdContent;
