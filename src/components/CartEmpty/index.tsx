import type { FC } from "react";

import { Link } from "react-router-dom";

import cartEmptyImg from "../../assets/img/empty-cart.png";

import styles from "../CartEmpty/index.module.scss";

export const CartEmpty: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.img__block}>
        <img src={cartEmptyImg} alt="" />
      </div>
      <div className={styles.description__block}>
        <h2>Корзина пустая</h2>
        <p>Беги скорее за крутыми предметами в наш каталог</p>
        <Link to="/">
          <button>В каталог</button>
        </Link>
      </div>
    </div>
  );
};
