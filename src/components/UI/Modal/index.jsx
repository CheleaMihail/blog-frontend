import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import styles from "./Modal.module.scss";

const Modal = ({ showModal, closeModal }) => {
  return (
    <div className={classNames(styles.overlay, showModal && styles.visible)}>
      <div className={styles.modal}>
        <div className={styles.modal__container}>
          <div className={styles.modal__closeBtn} onClick={closeModal} />
          <div className={styles.modal__body}>
            <div className={styles.modal__image} />
            <div className={styles.modal__message}>
              You can not to write a comment becouse you are not registered.
              First, login or create an account.
            </div>
          </div>
          <div className={styles.modal__bottom}>
            <Link
              to={"/login"}
              className={classNames(styles.button, styles.white)}
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className={classNames(styles.button, styles.blue)}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
