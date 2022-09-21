import React from "react";

import styles from "./SkeletonPost.module.scss";
import SkeletonUserInfo from "../SkeletonUserInfo";

const SkeletonPost = () => {
  return (
    <div className={styles.post}>
      <div className={styles.post__image} />
      <div className={styles.post__body}>
        <SkeletonUserInfo />
        <div className={styles.indention}>
          <h2 className={styles.post__title}></h2>
          <div className={styles.post__tags}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={styles.post__details}>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPost;
