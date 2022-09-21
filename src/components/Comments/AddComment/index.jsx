import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import styles from "./AddComment.module.scss";
import noAvatar from "../../../assets/question.png";
import { selectIsAuth } from "../../../redux/slices/auth";

const AddComment = ({ avatarUrl, fullname, value, setValue, handleSubmit }) => {
  const textareaRef = useRef(null);
  const isAuth = useSelector(selectIsAuth);
  const firstSybol = fullname.substring(0, 2);

  useEffect(() => {
    textareaRef.current.style.height = "36px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, []);

  return (
    <div className={styles.block}>
      {!isAuth ? (
        <img src={noAvatar} alt="Avatar" className={styles.avatar} />
      ) : avatarUrl ? (
        <img
          src={`http://localhost:5000${avatarUrl}`}
          alt="Avatar"
          className={styles.avatar}
        />
      ) : (
        <span className={classNames(styles.avatar, styles.noImage)}>
          {firstSybol}
        </span>
      )}
      <div className={styles.form}>
        <div className={styles.form__inputField}>
          <textarea
            ref={textareaRef}
            value={value}
            placeholder="Write comment"
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button className={styles.form__button} onClick={handleSubmit}>
          Add comment...
        </button>
      </div>
    </div>
  );
};

export default AddComment;
