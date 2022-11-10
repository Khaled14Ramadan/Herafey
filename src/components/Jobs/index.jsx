import React from "react";
import UsersList from "./users/UsersList";
import  Filters  from "./users/Filters";
import Sort from "./users/Sort";
import styles from "./jobs.module.scss"
const Jobs = () => {
  return (
    <main>
      
      <div className="container">
        <div className={styles.products}>
          <Filters/>
          <div>
            <Sort />
            <UsersList />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Jobs;
