import { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./Home.module.scss";
import Post from "../../components/Post";
import TagsBlock from "../../components/TagsBlock";
import CommentsBlock from "../../components/CommentsBlock";
import {
  fetchPopularPosts,
  fetchPosts,
  fetchTags,
} from "../../redux/slices/posts";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageUrl = window.location.pathname;
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const [selectedTab, setSelectedTab] = useState(
    pageUrl === "/" ? "new" : "popular"
  );
  const isPostsLoading = posts.status === "loading";
  const areTagsLoading = tags.status === "loading";

  useEffect(() => {
    if (selectedTab === "new") {
      dispatch(fetchPosts());
    } else {
      dispatch(fetchPopularPosts());
    }
    dispatch(fetchTags());
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
              <Post key={index} isLoading={true} />
            ) : (
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
            )
          )}
        </div>
        <div className={styles.home__details}>
          <TagsBlock items={tags.items} isLoading={areTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Mike Skin",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "This is random message",
              },
              {
                user: {
                  fullName: "Giku Boievicu",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </div>
      </div>
    </div>
  );
};
