import type { FC } from "react";

import ReactPaginate from "react-paginate";

import { useSelector } from "react-redux";

import { selectProductData } from "../../redux/product/selectors";

import styles from "../Pagination/index.module.scss";

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  onChangePage,
}) => {
  const { data } = useSelector(selectProductData);

  return data.pagination.count != 1 ? (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel={
        <svg
          height="22px"
          width="22px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 " />
        </svg>
      }
      previousLabel={
        <svg
          height="22px"
          width="22px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 " />
        </svg>
      }
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={3}
      pageCount={data.pagination.count}
      forcePage={currentPage - 1}
    />
  ) : (
    <></>
  );
};
