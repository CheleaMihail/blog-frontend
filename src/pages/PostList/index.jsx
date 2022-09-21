import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { v4 } from "uuid";

import Post from "../../components/Post";
import axios from "../../axios";
import styles from "./PostList.module.scss";
import SkeletonPost from "../../components/Skeleton/SkeletonPost";

const PostList = () => {
  const { name } = useParams();
  const userData = useSelector((state) => state.auth.data);
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await axios.get(`/tags/${name}`);
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.warn(error);
        alert("Error on searching posts");
      }
    }
    fetchPosts();
  }, [name]);

  const renderFakeList = () =>
    [...new Array(3)].map(() => <SkeletonPost key={v4()} />);

  const renderPostsList = (items) =>
    items.map((item) => (
      <Post
        key={item._id}
        id={item._id}
        title={item.title}
        imageUrl={item.imageUrl ? `http://localhost:5000${item.imageUrl}` : ""}
        user={item.user}
        createdAt={item.createdAt}
        viewsCount={item.viewsCount}
        commentsCount={item.commentsCount}
        tags={item.tags}
        isEditable={userData?._id === item.user._id}
      />
    ));

  return (
    <div className={styles.list}>
      <div className={styles.list__header}>
        <h2 className={styles.list__title}>{`Posts with hashtag: #${name}`}</h2>
        <Link to="/">Back</Link>
      </div>
      <div className={styles.list__content}>
        {loading ? renderFakeList() : renderPostsList(posts)}
      </div>
    </div>
  );
};

export default PostList;
