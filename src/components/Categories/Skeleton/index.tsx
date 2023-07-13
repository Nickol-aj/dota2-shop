import type { FC } from "react";

import styles from "../Skeleton/index.module.scss";

const Skeleton: FC = () => (
  <div className={styles.skeleton__block}>
    <div className={styles.loading}></div>
  </div>
);

export default Skeleton;
