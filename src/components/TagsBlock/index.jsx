import React from "react";
import { Link } from "react-router-dom";
import { SideBlock } from "../SideBlock";

import styles from "./TagsBlock.module.scss";

const TagsBlock = ({ items, isLoading }) => {
  return (
    <SideBlock title="Tags">
      <ul className={styles.tags}>
        {(isLoading ? [...Array(5)] : items).map((name, index) => (
          <Link className={styles.link} to={`/tags/${name}`}>
            <li key={index} className={styles.tag}>
              <img src={require("../../assets/tag.png")} alt="tag" />
              {isLoading ? (
                <span>@@@@@@@@@@@@@@@@@@@@@@@</span>
              ) : (
                <span>{name}</span>
              )}
            </li>
          </Link>
        ))}
      </ul>
    </SideBlock>
  );
};

export default TagsBlock;
