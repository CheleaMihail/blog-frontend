import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Post from "../../components/Post";
import CommentsBlock from "../../components/Comments/CommentsBlock";
import AddComment from "../../components/Comments/AddComment";
import axios from "../../axios";
import { myInfo } from "../../redux/slices/auth";
import noAvatar from "../../assets/question.png";
import Modal from "../../components/UI/Modal";
import styles from "./FullPost.module.scss";

export const FullPost = ({ isAuth }) => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [postComments, setPostComments] = useState([]);
  const [newComment, setNewComment] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const me = useSelector(myInfo);

  const fetchFullPost = async () => {
    await axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error on getting post");
      })
      .finally(() => setIsLoading(false));

    await axios
      .get(`/posts/comments/${id}`)
      .then((res) => setPostComments(res.data));
  };

  useEffect(() => {
    fetchFullPost();

    if (showModal) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [newComment, showModal]);

  const closeModal = () => setShowModal(false);

  const handleSubmit = async () => {
    const text = { commentText };
    if (!isAuth) {
      return setShowModal(true);
    } else {
      try {
        if (commentText !== "") {
          await axios.post(`/posts/${id}`, text);
        }
      } catch (error) {
        console.log(error);
        alert("Error on sending comment");
      }
    }
    setCommentText("");
    setNewComment(true);
  };

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <div>
        <Link to="/" className={styles.backBtn}>
          <span>Back</span>
        </Link>
        <Post
          id={data._id}
          title={data.title}
          imageUrl={
            data.imageUrl?.length > 0
              ? `http://localhost:5000${data.imageUrl}`
              : require("../../assets/question.png")
          }
          user={data.user}
          createdAt={data.createdAt}
          viewsCount={data.viewsCount}
          commentsCount={data.commentsCount}
          tags={data.tags}
          isFullPost
        >
          <ReactMarkdown children={data.text} />
        </Post>
        <CommentsBlock items={postComments} isLoading={isLoading}>
          <AddComment
            avatarUrl={isAuth ? me.avatarUrl : noAvatar}
            fullname={isAuth ? me.fullName : ""}
            value={commentText}
            setValue={setCommentText}
            handleSubmit={handleSubmit}
          />
        </CommentsBlock>
      </div>
      <Modal showModal={showModal} closeModal={closeModal}></Modal>
    </>
  );
};
