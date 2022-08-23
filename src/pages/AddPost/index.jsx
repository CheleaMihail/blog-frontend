import { useCallback, useMemo, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { selectIsAuth } from "../../redux/slices/auth";
import axios from "../../axios";

export const AddPost = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const inputFileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("upload", formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Error when upload image");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = { title, imageUrl, tags: tags.split(","), text };
      console.log(fields);
      const { data } = await axios.post("/posts", fields);
      const id = data._id;
      navigate(`/posts/${id}`);
      setLoading(false);
    } catch (error) {
      console.warn(error);
      alert("Error on creating post");
    }
  };

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.addPost}>
      <div className={styles.addPost__top}>
        <div className={styles.buttons}>
          <button
            className={styles.previewBtn}
            onClick={() => inputFileRef.current.click()}
          >
            <span>Add image</span>
          </button>
          {imageUrl && (
            <button className={styles.removeImage} onClick={onClickRemoveImage}>
              Remove image
            </button>
          )}
        </div>
        <input
          type="file"
          ref={inputFileRef}
          onChange={handleChangeFile}
          hidden
        />
        {imageUrl && (
          <img
            className={styles.image}
            src={`http://localhost:5000${imageUrl}`}
            alt="Uploaded"
          />
        )}
        <input
          className={styles.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title..."
        />
        <div className={styles.tags}>
          <input
            placeholder="Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
      </div>

      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <button className={styles.postBtn} onClick={onSubmit}>
          Post
        </button>
        <Link to="/">
          <button className={styles.cancelBtn}>Cancel</button>
        </Link>
      </div>
    </div>
  );
};
