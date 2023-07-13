import type { FC } from "react";

import styles from "../../FullItem/Skeleton/index.module.scss";

export const Skeleton: FC = () => (
  <div className={styles.skeleton__block}>
    <div className={styles.loading}></div>
  </div>
);
