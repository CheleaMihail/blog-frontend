import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import axios from "axios";
import { v4 } from "uuid";

import styles from "./Registration.module.scss";
import avatar from "../../assets/avatar.png";
import { fetchRegister } from "../../redux/slices/auth";
import UploadAvatar from "../../components/UploadAvatar";

export const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [showRedactor, setShowRedactor] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const editorRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const selectImage = async () => {
    const blob = await (await fetch(preview)).blob();
    try {
      const formData = new FormData();
      formData.append("image", blob, v4() + ".png");
      const { data } = await axios.post(
        "http://localhost:5000/uploadAvatar",
        formData
      );
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Error when upload image");
    }
    setIsImageSelected(true);
    setShowRedactor(false);
  };

  const onSubmit = async (values) => {
    values.avatarUrl = imageUrl;
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert("Can not be registered");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      navigate("/");
    }
  };

  return (
    <>
      <div className={styles.registration}>
        <div className={styles.registration__body}>
          <h3 className={styles.registration__title}>Create account</h3>
          <div className={classNames(styles.registration__avatar, avatar)}>
            <div className={styles.avatar__container}>
              <img
                className={styles.avatar__image}
                src={isImageSelected ? preview : avatar}
                alt="Avatar"
              />
              <span
                className={styles.avatar__overlay}
                onClick={() => setShowRedactor(true)}
              >
                Change image
              </span>
              <span className={styles.avatar__button}>
                <span />
              </span>
              {/* <input type="file" hidden ref={""} /> */}
            </div>
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
      <UploadAvatar
        selectImage={selectImage}
        preview={preview}
        setPreview={setPreview}
        visible={showRedactor}
        editorRef={editorRef}
      />
    </>
  );
};
