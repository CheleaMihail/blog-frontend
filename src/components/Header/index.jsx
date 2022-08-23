import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsAuth, logout } from "../../redux/slices/auth";

import styles from "./Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to exit")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__body}>
          <Link className={styles.header__logo} to="/">
            <div>MIKESKIN BLOG</div>
          </Link>
          <div className={styles.header__butons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <button>Create post</button>
                </Link>
                <button onClick={onClickLogout} className={styles.red}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className={styles.white}>Log in</button>
                </Link>
                <Link to="/register">
                  <button>Register</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
