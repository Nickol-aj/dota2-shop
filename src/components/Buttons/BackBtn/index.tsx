import type { FC } from "react";

import { Link } from "react-router-dom";

import styles from "../BackBtn/index.module.scss";

const BackBtn: FC = () => {
  return (
    <Link to="/">
      <button className={styles.btn}>Вернуться</button>
    </Link>
  );
};

export default BackBtn;
