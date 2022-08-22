import React from "react";

import styles from "./CommentsBlock.module.scss";
import { SideBlock } from "../SideBlock";

const CommentsBlock = ({ items, children, isLoading = true }) => {
  return (
    <SideBlock title="Comments">
      <ul className={styles.comments}>
        {(isLoading ? [...Array(5)] : items).map((item, index) => (
          <li key={index} className={styles.comment}>
            <img
              src={item.user.avatarUrl}
              alt="avatar"
              className={styles.comment__avatar}
            />
            <div className={styles.comment__description}>
              <h5 className={styles.comment__author}>{item.user.fullName}</h5>
              <p className={styles.comment__text}>{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
      {children}
    </SideBlock>
  );
};

export default CommentsBlock;
