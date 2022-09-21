import { v4 } from "uuid";

import styles from "./CommentsBlock.module.scss";
import { SideBlock } from "../../SideBlock";
import Comment from "../Comment";

const CommentsBlock = ({ items, children, isLoading }) => {
  const renderComments = (comments) =>
    comments.map((item) => <Comment item={item} key={item._id} />);

  const renderSkeletonComents = () =>
    [...Array(5)].map(() => (
      <div className={styles.skeleton} key={v4()}>
        <div className={styles.skeleton__img}></div>
        <div className={styles.skeleton__container}>
          <div className={styles.skeleton__title}></div>
          <div className={styles.skeleton__text}></div>
        </div>
      </div>
    ));

  return (
    <SideBlock title="Comments">
      {children}
      <ul className={styles.comments}>
        {isLoading ? renderSkeletonComents() : renderComments(items)}
      </ul>
    </SideBlock>
  );
};

export default CommentsBlock;
