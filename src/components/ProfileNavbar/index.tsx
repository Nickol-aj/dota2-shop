import React from "react";

import FirstContent from "./FirstContent";
import SecondContent from "./SecondContent";
import ThirdContent from "./ThirdContent";

import styles from "./index.module.scss";

export const ProfileNavbar = () => {
  const [toggleState, setToggleState] = React.useState(1);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };
  return (
    <>
      <div className={styles.tabs__block}>
        <button
          className={
            toggleState === 1
              ? `${styles.tab} ${styles.active__tab}`
              : styles.tab
          }
          onClick={() => toggleTab(1)}
        >
          Профиль
        </button>

        <button
          className={
            toggleState === 2
              ? `${styles.tab} ${styles.active__tab}`
              : styles.tab
          }
          onClick={() => toggleTab(2)}
        >
          Покупки
        </button>

        <button
          className={
            toggleState === 3
              ? `${styles.tab} ${styles.active__tab}`
              : styles.tab
          }
          onClick={() => toggleTab(3)}
        >
          Настройки
        </button>
      </div>

      <div className={styles.content__container}>
        <div
          className={
            toggleState === 1 ? styles.active__content : styles.content
          }
        >
          <FirstContent />
        </div>

        <div
          className={
            toggleState === 2 ? styles.content.active__content : styles.content
          }
        >
          <SecondContent />
        </div>

        <div
          className={
            toggleState === 3 ? styles.content.active__content : styles.content
          }
        >
          <ThirdContent />
        </div>
      </div>
    </>
  );
};
