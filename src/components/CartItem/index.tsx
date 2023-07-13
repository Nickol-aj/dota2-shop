import type { FC } from "react";

import { useDispatch } from "react-redux";

import { addItem, minusItem, removeItem } from "../../redux/cart/slice";
import { CartItem as CartItemType } from "../../redux/cart/types";

import axios from "axios";

import { BASKET_URL } from "../../server/serverLink";
import { addTokenToHeader } from "../../server/utils";

import { ToastContainer } from "react-toastify";

import { error__message } from "../../messages";

import styles from "../CartItem/index.module.scss";

type CartItemProps = {
  id: string;
  title: string;
  name: string;
  grade: string;
  realPrice: number;
  priceWithoutSale: number;
  sale: number;
  image: string;
  icon: string;
  count: number;
};

export const CartItem: FC<CartItemProps> = ({
  id,
  name,
  title,
  grade,
  realPrice,
  priceWithoutSale,
  image,
  icon,
  count,
}: CartItemProps) => {
  const dispatch = useDispatch();

  const isAuthenticated = localStorage.getItem("accessToken");

  const onClickPlus = () => {
    try {
      addTokenToHeader(isAuthenticated);
      axios.put(BASKET_URL, { skin_id: id });
      dispatch(
        addItem({
          id,
        } as CartItemType)
      );
    } catch (error) {
      console.log(error);
      
    }
  };

  const onClickMinus = () => {
    try {
      addTokenToHeader(isAuthenticated);
      axios.patch(BASKET_URL, {
        skin_id: id,
        action: "decrease",
      });
      dispatch(minusItem(id));
    } catch (error) {
      console.log(error);
    }
  };

  const onClickRemove = () => {
    try {
      addTokenToHeader(isAuthenticated);
      axios.patch(BASKET_URL, {
        skin_id: id,
        action: "remove",
      });
      dispatch(removeItem(id));
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.item__content}>
          <div className={styles.left__block}>
            <div className={styles.item__image}>
              <img src={`http://34.78.241.147${image}`} alt="Product" />
            </div>
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
          </div>
          <div className={styles.midle__block}>
            <h2 className={styles.item__name}>{title}</h2>
            <ul>
              <li>
                <span>Цена :</span>
                {priceWithoutSale} руб
              </li>
              <li>
                <span>Скидка :</span>
                {priceWithoutSale - realPrice} руб
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.right__block}>
          <span>Итого :</span>
          <div className={styles.item__price}>{realPrice * count} руб</div>
          <div className={styles.item__count}>
            <button disabled={count == 1} onClick={onClickMinus}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="18"
              >
                <line x1="5" x2="19" y1="12" y2="12" />
              </svg>
            </button>
            <b>{count}</b>
            <button onClick={onClickPlus}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="feather feather-plus"
                height="18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="18"
              >
                <line x1="12" x2="12" y1="5" y2="19" />
                <line x1="5" x2="19" y1="12" y2="12" />
              </svg>
            </button>
          </div>
          <div className={styles.item__remove}>
            <div onClick={onClickRemove}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25px"
                height="25px"
                viewBox="0 0 15 15"
                version="1.1"
                id="waste-basket"
              >
                <path
                  d="M12.41,5.58l-1.34,8c-0.0433,0.2368-0.2493,0.4091-0.49,0.41H4.42c-0.2407-0.0009-0.4467-0.1732-0.49-0.41l-1.34-8&#10;&#9;C2.5458,5.3074,2.731,5.0506,3.0035,5.0064C3.0288,5.0023,3.0544,5.0002,3.08,5h8.83c0.2761-0.0036,0.5028,0.2174,0.5064,0.4935&#10;&#9;C12.4168,5.5225,12.4146,5.5514,12.41,5.58z M13,3.5C13,3.7761,12.7761,4,12.5,4h-10C2.2239,4,2,3.7761,2,3.5S2.2239,3,2.5,3H5V1.5&#10;&#9;C5,1.2239,5.2239,1,5.5,1h4C9.7761,1,10,1.2239,10,1.5V3h2.5C12.7761,3,13,3.2239,13,3.5z M9,3V2H6v1H9z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
