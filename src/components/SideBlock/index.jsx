import React from "react";

import styles from "./SideBlock.module.scss";

export const SideBlock = ({ title, children }) => {
  return (
    <div className={styles.block}>
      <h3 className={styles.title}>{title}</h3>
      {children}
    </div>
  );
};
