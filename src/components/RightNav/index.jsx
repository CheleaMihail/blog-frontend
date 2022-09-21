import React from "react";
import classNames from "classnames";

import styles from "./RightNav.module.scss";

const RightNav = ({ children, show }) => {
  return (
    <div
      className={classNames(styles.rightNav, show === true && styles.visible)}
    >
      <div className={styles.rightNav__content}>
        <div className={styles.rightNav__list}>{children}</div>
      </div>
    </div>
  );
};

export default RightNav;
