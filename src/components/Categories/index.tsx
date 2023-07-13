import type { FC } from "react";

import React from "react";

import axios from "axios";

import { CATEGORIES_URL } from "../../server/serverLink";

import { ToastContainer, toast } from "react-toastify";

import Skeleton from "../Categories/Skeleton/index";

import styles from "../Categories/index.module.scss";

type CategoriesProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
};

export const Categories: FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
    const [categories, setCategory] = React.useState<any[]>([]);

    async function fetchCategories() {
      try {
        const { data } = await axios.get(CATEGORIES_URL);
        setCategory(data.categories);
      } catch (error: any) {
        toast.error(error.data.error.error, {
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
    }

    React.useEffect(() => {
      fetchCategories();
    }, []);

    return (
      <>
        <div className={styles.categories__container}>
          <ul>
            <h2>Категории</h2>
            {categories.length !== 0 ? (
              categories.map((category, i) => (
                <li
                  key={i}
                  onClick={() => onChangeCategory(i)}
                  className={value === i ? styles.active : ""}
                >
                  {category.name}

                  <img src={`http://34.78.241.147${category.image}`} alt="" />
                </li>
              ))
            ) : (
              <Skeleton />
            )}
          </ul>
        </div>
        <ToastContainer />
      </>
    );
  }
);
