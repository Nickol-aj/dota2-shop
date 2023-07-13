import type { FC } from "react";

import { Link, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import { selectCart } from "../../redux/cart/selectors";

import styles from "../Header/index.module.scss";

export const Header: FC = () => {
  const location = useLocation();

  const { pathname } = location;

  const splitLocation = pathname.split("/");

  const { items } = useSelector(selectCart);

  const totalCount = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );

  const Logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.left__block}>
          <nav className={styles.header__menu}>
            <ul className={styles.menu__list}>
              <li className={styles.menu__item}>
                <Link
                  className={splitLocation[1] === "" ? styles.active : ""}
                  to="/"
                >
                  Каталог
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.right__block}>
          {location.pathname != "/cart" && (
            <div className={styles.cart}>
              <Link to="/cart">
                <svg
                  height="22"
                  viewBox="0 0 48 48"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14 36c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zM2 4v4h4l7.19 15.17-2.7 4.9c-.31.58-.49 1.23-.49 1.93 0 2.21 1.79 4 4 4h24v-4H14.85c-.28 0-.5-.22-.5-.5 0-.09.02-.17.06-.24L16.2 26h14.9c1.5 0 2.81-.83 3.5-2.06l7.15-12.98c.16-.28.25-.61.25-.96 0-1.11-.9-2-2-2H10.43l-1.9-4H2zm32 32c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4z" />
                  <path d="M0 0h48v48H0z" fill="none" />
                </svg>
              </Link>
              {totalCount > 0 && <span>{totalCount}</span>}
            </div>
          )}
          {location.pathname != "/profile" && (
            <div className={styles.profile}>
              <Link to="/profile">
                <svg
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  height="22"
                  width="22"
                >
                  <path d="M256 112c-48.6 0-88 39.4-88 88C168 248.6 207.4 288 256 288s88-39.4 88-88C344 151.4 304.6 112 256 112zM256 240c-22.06 0-40-17.95-40-40C216 177.9 233.9 160 256 160s40 17.94 40 40C296 222.1 278.1 240 256 240zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-46.73 0-89.76-15.68-124.5-41.79C148.8 389 182.4 368 220.2 368h71.69c37.75 0 71.31 21.01 88.68 54.21C345.8 448.3 302.7 464 256 464zM416.2 388.5C389.2 346.3 343.2 320 291.8 320H220.2c-51.36 0-97.35 26.25-124.4 68.48C65.96 352.5 48 306.3 48 256c0-114.7 93.31-208 208-208s208 93.31 208 208C464 306.3 446 352.5 416.2 388.5z" />
                </svg>
              </Link>
            </div>
          )}

          <div className={styles.logout}>
            <span onClick={Logout}>Выйти</span>
          </div>
        </div>
      </div>
    </header>
  );
};
