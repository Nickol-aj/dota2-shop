import type { FC } from "react";

import React from "react";

import { useDispatch } from "react-redux";

import { Sort as SortType, SortPropertyEnum } from "../../redux/filter/types";
import { setSort } from "../../redux/filter/slice";

import styles from "../Sort/index.module.scss";

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export type SortPopupProps = {
  value: SortType;
};

export const sortList: SortItem[] = [
  { name: "по убыванию цены", sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: "по возрастанию цены", sortProperty: SortPropertyEnum.PRICE_ASC },
];

export const Sort: FC<SortPopupProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  return (
    <div className={styles.sort}>
      <div className={styles.label}>
        <b>Сортировка по :</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className={styles.popup}>
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={
                  value.sortProperty === obj.sortProperty ? styles.active : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
