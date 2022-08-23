import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Post from "../../components/Post";
import axios from "../../axios";
import styles from "./PostList.module.scss";

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
  }, []);

  return (
    <div className={styles.list}>
      <h2 className={styles.list__title}>{`Posts with hashtag: #${name}`}</h2>
      <div className={styles.aaaa}>
        {(loading ? [...Array(5)] : posts).map((item, index) =>
          loading ? (
            <div className={styles.list__item}>
              <Post key={index} isLoading={true} />
            </div>
          ) : (
            <div className={styles.list__item}>
              <Post
                id={item._id}
                title={item.title}
                imageUrl={
                  item.imageUrl ? `http://localhost:5000${item.imageUrl}` : ""
                }
                user={item.user}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                commentsCount={item.commentsCount}
                tags={item.tags}
                isEditable={userData?._id === item.user._id}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PostList;
