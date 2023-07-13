import type { FC } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { selectCartItemById } from "../../redux/cart/selectors";
import { addItem } from "../../redux/cart/slice";
import { CartItem } from "../../redux/cart/types";

import axios from "axios";

import { BASKET_URL } from "../../server/serverLink";
import { addTokenToHeader } from "../../server/utils";

import { ToastContainer, toast } from "react-toastify";

import styles from "../ProductItem/index.module.scss";

type ProductItemProps = {
  id: string;
  title: string;
  name: string;
  grade: string;
  realPrice: number;
  priceWithoutSale: number;
  image: string;
  icon: string;
  sale: number;
};

export const ProductItem: FC<ProductItemProps> = ({
  id,
  name,
  title,
  grade,
  realPrice,
  priceWithoutSale,
  image,
  icon,
  sale,
}) => {
  const dispatch = useDispatch();

  const cartItem = useSelector(selectCartItemById(id));

  const addedCount = cartItem ? cartItem.count : 0;

  const isAuthenticated = localStorage.getItem("accessToken");

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      realPrice,
      priceWithoutSale,
      sale,
      image,
      name,
      grade,
      icon,
      count: 0,
    };
    try {
      addTokenToHeader(isAuthenticated);
      axios.put(BASKET_URL, { skin_id: item.id });
      dispatch(addItem(item));
    } catch (error: any) {
      toast.error(error.data.exception, {
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
  };

  return (
    <article className={styles.catalog__item}>
      <Link key={id} to={`product/${id}`}>
        <div className={styles.item__image}>
          <img src={`http://34.78.241.147${image}`} alt="Product" />
        </div>
      </Link>

      <div className={styles.item__description}>
        <span className={styles.item__title}>{title}</span>
        <div className={styles.hero__description}>
          <img src={`http://34.78.241.147${icon}`} alt="Icon" />
          <div>
            <p className={styles.hero__name}>{name}</p>
            <p
              style={{
                color:
                  grade === "Rare"
                    ? "#4b69ff"
                    : grade === "Mythical"
                    ? "#8847ff"
                    : grade === "Immortal"
                    ? "#e4ae39"
                    : "",
              }}
              className={styles.hero__grade}
            >
              {grade}
            </p>
          </div>
        </div>

        <div className={styles.rb__panel}>
          <div className={styles.item__price}>
            <div className={styles.real__price}>
              {realPrice}
              <span>руб</span>
            </div>
            {sale != 0 ? (
              <div className={styles.sale__price}>{priceWithoutSale}</div>
            ) : (
              ""
            )}
          </div>
          <button onClick={onClickAdd} className={styles.btn}>
            В корзину
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>

      {sale != 0 ? (
        <div className={styles.sale__block}>
          Скидка
          <div>{sale} %</div>
        </div>
      ) : (
        ""
      )}
      <ToastContainer />
    </article>
  );
};
