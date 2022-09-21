import React from "react";
import { useState } from "react";
import classNames from "classnames";

import styles from "./BurgerMenu.module.scss";

const BurgerMenu = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={classNames(styles.menu, isOpen && styles.openedMenu)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default BurgerMenu;
