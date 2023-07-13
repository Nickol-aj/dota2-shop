import type { FC } from "react";

import React from "react";

import { useParams, useNavigate, Navigate } from "react-router-dom";

import axios from "axios";

import { error__message } from "../../messages";

import { PRODUCTS_URL } from "../../server/serverLink";

import { Skeleton } from "./Skeleton";

import styles from "../FullItem/index.module.scss";

const FullItem: FC = () => {
  const isAuthenticated = localStorage.getItem("accessToken");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const [product, setProduct] = React.useState<{
    image: string;
    icon: string;
    video: string;
    title: string;
    name: string;
    grade: string;
    kind: string;
    content: string;
    version: string;
    history: string;
    realPrice: number;
    priceWithoutSale: number;
    sale: number;
  }>();

  const { id } = useParams();

  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`${PRODUCTS_URL}${id}/`);
        setProduct(data.item);
      } catch (error) {
        error__message();
        navigate("/");
      }
    }
    fetchProduct();
    window.scroll(0, 0);
  }, []);

  if (!product) {
    return <Skeleton />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.video__block}>
        {product.video == null ? (
          <img src={`http://34.78.241.147${product.image}`} alt="" />
        ) : (
          <video controls poster={`http://34.78.241.147${product.image}`}>
            <source src={`http://34.78.241.147${product.video}`} />
          </video>
        )}
        {product.video}
      </div>

      <div className={styles.description__block}>
        <h1>{product.title}</h1>
        <div className={styles.item__price}>
          <div className={styles.real__price}>
            {product.realPrice} <span>руб</span>
          </div>
          {product.sale != 0 ? (
            <div className={styles.sale__price}>
              {product.priceWithoutSale} <span>руб</span>
              <div>-{product.sale}%</div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.hero__description}>
          <div className={styles.hero__name}>
            <img src={`http://34.78.241.147${product.icon}`} alt="" />
            {product.name}
          </div>
          <div className={styles.item__kind}>{product.kind}</div>
          <div
            className={styles.hero__grade}
            style={{
              color:
                product.grade === "Rare"
                  ? "#4b69ff"
                  : product.grade === "Mythical"
                  ? "#8847ff"
                  : product.grade === "Immortal"
                  ? "#e4ae39"
                  : "",
              borderColor:
                product.grade === "Rare"
                  ? "#4b69ff"
                  : product.grade === "Mythical"
                  ? "#8847ff"
                  : product.grade === "Immortal"
                  ? "#e4ae39"
                  : "",
            }}
          >
            {product.grade}
          </div>
        </div>
        <>
          <h2>Описание предмета</h2>
          <div className={styles.item__description}>
            <p>{product.content}</p>
            <p>{product.version}</p>
            <p>{product.history}</p>
          </div>
          <button>В корзину</button>
        </>
      </div>
    </div>
  );
};

export default FullItem;
