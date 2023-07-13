import type { FC } from "react";

import styles from "../../ProductItem/Skeleton/index.module.scss";

export const Skeleton: FC = () => (
  <div className={styles.skeleton__block}>
    <div className={styles.loading}></div>
  </div>
);
