import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Registration.module.scss";
import avatar from "../../assets/avatar.png";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Mike",
      email: "mike@gmail.com",
      password: "111111",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert("Can not be registered");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  return (
    <div className={styles.registration}>
      <div className={styles.registration__body}>
        <h3 className={styles.registration__title}>Create account</h3>
        <div className={styles.registration__avatar}>
          <img src={avatar} alt="Avatar" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <div
              className={classNames(
                styles.field__input,
                errors.fullName && styles.errorBorder
              )}
            >
              <input
                placeholder="Full name"
                {...register("fullName", { required: "Enter full name" })}
              />
            </div>
            {errors.fullName && (
              <span className={styles.field__error}>
                {errors.fullName.message}
              </span>
            )}
          </div>
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
          <button type="submit" disabled={!isValid} className={styles.login}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
