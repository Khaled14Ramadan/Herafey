import React from "react";
import User from "./User";
import styles from "./gridview.module.scss";
const GridView = () => {
  return (
    <div className={styles.usersContainer}>
      <User />
    </div>
  );
};

export default GridView;
