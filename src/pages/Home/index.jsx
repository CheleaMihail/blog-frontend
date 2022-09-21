import { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./Home.module.scss";
import Post from "../../components/Post";
import TagsBlock from "../../components/TagsBlock";
import CommentsBlock from "../../components/Comments/CommentsBlock";
import {
  fetchComments,
  fetchPopularPosts,
  fetchPosts,
  fetchTags,
} from "../../redux/slices/posts";
import SkeletonPost from "../../components/Skeleton/SkeletonPost";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageUrl = window.location.pathname;
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags, comments } = useSelector((state) => state.posts);
  const [selectedTab, setSelectedTab] = useState(
    pageUrl === "/" ? "new" : "popular"
  );
  const isPostsLoading = posts.status === "loading";
  const areTagsLoading = tags.status === "loading";
  const areCommentsLoading = comments.status === "loading";

  useEffect(() => {
    if (selectedTab === "new") {
      dispatch(fetchPosts());
    } else {
      dispatch(fetchPopularPosts());
    }
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, [selectedTab]);

  const handleClickNew = () => {
    navigate("/");
    setSelectedTab("new");
  };

  const handleClickPopular = () => {
    navigate("/popular");
    setSelectedTab("popular");
  };

  return (
    <div className={styles.home}>
      <div className={styles.home__tabs}>
        <div
          className={classNames(
            styles.tab,
            selectedTab === "new" && styles.active
          )}
          onClick={handleClickNew}
        >
          New
        </div>
        <div
          className={classNames(
            styles.tab,
            selectedTab === "popular" && styles.active
          )}
          onClick={handleClickPopular}
        >
          Popular
        </div>
      </div>
      <div className={styles.home__body}>
        <div className={styles.home__feed}>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((item, index) =>
            isPostsLoading ? (
              <SkeletonPost key={index} />
            ) : (
              <Post
                key={item._id}
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
            )
          )}
        </div>
        <div className={styles.home__details}>
          <TagsBlock items={tags.items} isLoading={areTagsLoading} />
          <CommentsBlock
            items={comments.items}
            isLoading={areCommentsLoading}
          />
        </div>
      </div>
    </div>
  );
};
