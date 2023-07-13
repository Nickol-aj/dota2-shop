import type { FC } from "react";

import { Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { selectCart } from "../../redux/cart/selectors";

import { clearItems } from "../../redux/cart/slice";

import { CartEmpty, CartItem } from "../../components";

import axios from "axios";

import { BASKET_URL } from "../../server/serverLink";
import { addTokenToHeader } from "../../server/utils";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import BackBtn from "../../components/Buttons/BackBtn";

import styles from "../Cart/index.module.scss";

const Cart: FC = () => {
  const isAuthenticated = localStorage.getItem("accessToken");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const { items, totalPrice, totalPriceWithoutSale } = useSelector(selectCart);

  const dispatch = useDispatch();

  const onClickClear = () => {
    axios.delete(BASKET_URL);
    dispatch(clearItems());
  };

  const totalCount = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );

  const totalSale = items.reduce(
    (sum: number, item: any) =>
      sum + (item.priceWithoutSale - item.realPrice) * item.count,
    0
  );

  const onPay = () => {
    axios
      .post(BASKET_URL)
      .then((res) => {
        if (res.status === 200) {
          addTokenToHeader(isAuthenticated);
          axios.post(BASKET_URL);
          toast.success(res.data.success, {
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
            window.location.href = "/";
          }, 3000);
        }
      })
      .catch((error) => {
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
      });
    setTimeout(() => {
      window.location.href = "/profile";
    }, 3000);
  };

  return (
    <>
      {!totalPrice ? (
        <CartEmpty />
      ) : (
        <div className={styles.container}>
          <div className={styles.item__block}>
            <BackBtn />
            <p>Корзина</p>
            <div className={styles.items__container}>
              {items.map((item: any) => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>
          </div>
          <div className={styles.total__block}>
            <button
              className={`${styles.btn} ${styles.clear}`}
              onClick={onClickClear}
            >
              Очистить корзину
            </button>
            <div className={styles.total__details}>
              <div>
                Скидка : <b>{totalSale} ₽</b>
              </div>
              <div>
                Кол-во товаров : <b>{totalCount} шт.</b>
              </div>
            </div>
            <div className={styles.price__block}>
              <div>
                Cумма
                <p>{totalPriceWithoutSale} ₽</p>
              </div>
              <div>
                К оплате
                <p>{totalPrice} ₽</p>
              </div>
            </div>
            <hr />
            <button className={`${styles.btn} ${styles.buy}`} onClick={onPay}>
              Оплатить
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Cart;
