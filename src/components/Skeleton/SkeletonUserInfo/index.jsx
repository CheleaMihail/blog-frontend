import React from "react";

import styles from "./SkeletonUserInfo.module.scss";

const SkeletonUserInfo = () => {
  return (
    <div className={styles.user}>
      <div className={styles.user__avatar} />
      <div className={styles.user__details}>
        <div className={styles.user__name}></div>
        <div className={styles.user__additional}></div>
      </div>
    </div>
  );
};

export default SkeletonUserInfo;
