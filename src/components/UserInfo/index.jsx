import React from "react";

import styles from "./UserInfo.module.scss";

const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.user}>
      <img
        className={styles.user__avatar}
        src={avatarUrl || require("../../assets/noavatar.png")}
        alt={fullName}
      />
      <div className={styles.user__details}>
        <span className={styles.user__name}>{fullName}</span>
        <span className={styles.user__additional}>{additionalText}</span>
      </div>
    </div>
  );
};

export default UserInfo;
