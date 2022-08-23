import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import classNames from "classnames";

import styles from "./Post.module.scss";
import UserInfo from "../UserInfo";
import { fetchRemovePost } from "../../redux/slices/posts";

const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  const onClickRemove = () => {
    if (window.confirm("You want to delete this post?")) {
      dispatch(fetchRemovePost(id));
    }
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className={styles.post}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <div className={styles.button}>
              <img src={require("../../assets/post/pencil.png")} alt="edit" />
            </div>
          </Link>
          <div className={styles.button} onClick={onClickRemove}>
            <img src={require("../../assets/post/remove.png")} alt="remove" />
          </div>
        </div>
      )}
      {imageUrl && (
        <img
          className={classNames(styles.post__image, isFullPost && styles.full)}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.post__body}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2
            className={classNames(
              styles.post__title,
              isFullPost && styles.full
            )}
          >
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.post__tags}>
            {tags.map((name) => (
              <li key={name}>
                <a href={`/tag/${name}`}>#{name}</a>
              </li>
            ))}
          </ul>
          {children && <div className={styles.post__content}>{children}</div>}
          <ul className={styles.post__details}>
            <li>
              <img src={require("../../assets/post/eye.png")} alt="Eye" />
              <span>{viewsCount}</span>
            </li>
            <li>
              <img
                src={require("../../assets/post/comment.png")}
                alt="Comments"
              />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

Post.defaultProps = {
  isFullPost: false,
};

export default Post;
