import { useEffect, useRef, useState } from "react";

import styles from "./AddComment.module.scss";

const AddComment = () => {
  const textareaRef = useRef(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    textareaRef.current.style.height = "36px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [value]);

  return (
    <div className={styles.block}>
      <img
        src={require("../../assets/avatar.png")}
        alt="Avatar"
        className={styles.avatar}
      />
      <div className={styles.form}>
        <div className={styles.form__inputField}>
          <textarea
            ref={textareaRef}
            value={value}
            placeholder="Write comment"
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button className={styles.form__button}>Add comment...</button>
      </div>
    </div>
  );
};

export default AddComment;
