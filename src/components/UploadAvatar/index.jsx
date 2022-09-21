import React, { useState } from "react";
import Avatar from "react-avatar-edit";
import classNames from "classnames";

import styles from "./UploadAvatar.module.scss";

const UploadAvatar = ({
  visible,
  selectImage,
  preview,
  setPreview,
  editorRef,
}) => {
  const [src, setSrc] = useState(null);
  const onClose = () => setPreview(null);
  const onCrop = (view) => {
    setPreview(view);
  };

  return (
    <div className={classNames(styles.overlay, visible && styles.visible)}>
      <div className={styles.content}>
        <div className={styles.redactor}>
          <div className={styles.avatarBlock}>
            <h2>Edit image</h2>
            <Avatar
              ref={editorRef}
              imageWidth={400}
              width={400}
              height={300}
              src={src}
              onClose={onClose}
              onCrop={onCrop}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.postBtn} onClick={selectImage}>
            Ok
          </button>
          <button className={styles.cancelBtn}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UploadAvatar;
