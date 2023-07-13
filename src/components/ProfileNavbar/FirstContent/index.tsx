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

import styles from "./index.module.scss";

interface IUser {
  cash: number;
  photo: string;
  last_name: string;
  first_name: string;
  username: string;
  email: string;
}

const FirstContent = () => {
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
        console.log(error);
      }
    };
    fetchUserData();
    window.scrollTo(0, 0);
  }, [isAuthenticated]);

  const [formData, setFormData] = React.useState({
    old_password: "",
    new_password: "",
  });

  const handleArtMoney = () => {
    window.open("http://34.78.241.147/api/v1/art-money/", "_blank");
  };

  return (
    <div className={styles.container}>
      <div className={styles.item} id={styles.item__1}>
        <h3>Фото</h3>
        <div className={styles.photo__container}>
          {userData.photo ? (
            <>
              <img src={BASE_URL + userData.photo} alt="" />
            </>
          ) : (
            <>
              <img src={BASE_URL + userData.photo} alt="" />
            </>
          )}
        </div>
      </div>
      <div className={styles.item} id={styles.item__2}>
        <h3>Личные данные</h3>
        <div className={styles.user__data__container}>
          <div className={styles.personal__info}>
            <div className={styles.user__data}>
              <p>Фамилия</p>
              {editedLastName !== null ? (
                <div className={styles.user__data__value}>{editedLastName}</div>
              ) : (
                <div className={styles.user__data__value}></div>
              )}
            </div>
            <div className={styles.user__data}>
              <p>Имя</p>
              {editedFirstName !== null ? (
                <div className={styles.user__data__value}>
                  {editedFirstName}
                </div>
              ) : (
                <div className={styles.user__data__value}></div>
              )}
            </div>
            <div className={styles.user__data}>
              <p>Ник</p>
              <div className={styles.user__data__value}>
                {userData.username}
              </div>
            </div>
            <div className={styles.user__data}>
              <p>Email</p>
              <div className={styles.user__data__value}>{userData.email}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.item} id={styles.item__3}>
        <h3>Кошелёк</h3>
        <div>
          <span>{userData.cash}</span>руб
        </div>
        <button onClick={handleArtMoney}>Пополнить</button>
      </div>
    </div>
  );
};

export default FirstContent;
