import React from "react";
import classNames from "classnames";

import styles from "./Comment.module.scss";

const Comment = ({ item }) => {
  const firstSybol = (string) => string.substring(0, 2);
  const haveUserAvatar = Boolean(item.author.avatarUrl);
  return (
    <li className={styles.comment}>
      {haveUserAvatar ? (
        <img
          src={`http://localhost:5000${item.author.avatarUrl}`}
          alt="avatar"
          className={styles.comment__avatar}
        />
      ) : (
        <span
          className={classNames(
            styles.comment__avatar,
            styles.comment__noImage
          )}
        >
          {firstSybol(item.author.fullName)}
        </span>
      )}
      <div className={styles.comment__description}>
        <h5 className={styles.comment__author}>{item.author.fullName}</h5>
        <p className={styles.comment__text}>{item.text}</p>
      </div>
    </li>
  );
};

export default Comment;
