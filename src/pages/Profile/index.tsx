import type { FC } from "react";

import { Navigate } from "react-router-dom";

import { ProfileNavbar } from "../../components";

import styles from "./index.module.scss";

const Profile: FC = () => {
  const isAuthenticated = localStorage.getItem("accessToken");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={styles.container}>
      <h1>Личный кабинет </h1>
      <ProfileNavbar />
    </div>
  );
};

export default Profile;
