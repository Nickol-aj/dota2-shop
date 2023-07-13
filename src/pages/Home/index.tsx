import type { FC } from "react";

import React from "react";

import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { useAppDispatch } from "../../redux/store";

import { selectFilter } from "../../redux/filter/selectors";
import { setCategoryId, setCurrentPage } from "../../redux/filter/slice";

import { selectProductData } from "../../redux/product/selectors";
import { Product } from "../../redux/product/types";

import { fetchProduct } from "../../redux/product/asyncActions";

import {
  ServerError,
  ProductItem,
  Skeleton,
  Categories,
  Sort,
  Search,
  Pagination,
} from "../../components";

import styles from "../../pages/Home/index.module.scss";

const Home: FC = () => {
  const isAuthenticated = localStorage.getItem("accessToken");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const dispatch = useAppDispatch();

  const { data, status } = useSelector(selectProductData);

  const { categoryId, sort, searchValue, currentPage } =
    useSelector(selectFilter);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getProduct = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchProduct({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getProduct();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const products = data.items.map((obj: Product) => (
    <ProductItem key={obj.id} {...obj} />
  ));

  const skeletons = [...new Array(25)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className={styles.container}>
      {status == "error" ? (
        <ServerError />
      ) : (
        <>
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <div className={styles.right__block}>
            <div className={styles.catalog__container}>
              <div className={styles.search__container}>
                <Search />
                <Sort value={sort} />
              </div>
              <div className={styles.catalog__items}>
                {status == "loading" ? skeletons : products}
              </div>
              <Pagination
                currentPage={currentPage}
                onChangePage={onChangePage}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
