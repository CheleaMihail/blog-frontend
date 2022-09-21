import { Link } from "react-router-dom";
import { v4 } from "uuid";

import { SideBlock } from "../SideBlock";
import styles from "./TagsBlock.module.scss";

const TagsBlock = ({ items, isLoading }) => {
  const renderTags = (tags) =>
    tags.map((name) => (
      <Link className={styles.link} to={`/tags/${name}`} key={v4()}>
        <li key={name} className={styles.tag}>
          <img src={require("../../assets/tag.png")} alt="tag" />
          <span>{name}</span>
        </li>
      </Link>
    ));

  const renderSkeletonTags = () =>
    [...Array(5)].map(() => (
      <li key={v4()} className={styles.tag}>
        <img src={require("../../assets/tag.png")} alt="tag" />
        <div className={styles.skeletonTag}></div>
      </li>
    ));

  return (
    <SideBlock title="Tags">
      <ul className={styles.tags}>
        {isLoading ? renderSkeletonTags() : renderTags(items)}
      </ul>
    </SideBlock>
  );
};

export default TagsBlock;
