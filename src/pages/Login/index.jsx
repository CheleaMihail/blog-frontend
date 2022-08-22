import React from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("Can not be autentificated");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      alert("Can not be autentificated");
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.login}>
      <div className={styles.login__body}>
        <h3 className={styles.login__title}>Log in</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <div
              className={classNames(
                styles.field__input,
                errors.email && styles.errorBorder
              )}
            >
              <input
                type="email"
                placeholder="E-Mail"
                {...register("email", { required: "Enter email" })}
              />
            </div>
            {errors.email && (
              <span className={styles.field__error}>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className={styles.field}>
            <div
              className={classNames(
                styles.field__input,
                errors.password && styles.errorBorder
              )}
            >
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Enter password" })}
              />
            </div>
            {errors.password && (
              <span className={styles.field__error}>
                {errors.password.message}
              </span>
            )}
          </div>
          <button type="submit" className={styles.loginBtn}>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};
