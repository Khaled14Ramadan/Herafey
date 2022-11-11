import React from "react";
import PostShare from "../Home/PostShare/PostShare";
import FollowersSection from '../Home/FollowersSection/FollowersSection'
import TrendSection from "../Home/TrendSection/TrendSection";
import Posts from "../Home/Posts/Posts";
import ProfileSection from './ProfileSection/ProfileSection';
import './Profile.css'
const Profile = () => {

  return (
    <div className="ProfilePage">

    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-12">
          <ProfileSection/>
        <PostShare/>
        <Posts/>
        </div>
        <div className="col-lg-4 d-lg-block d-none">
          <FollowersSection/> 
          <TrendSection/>
        </div>
      </div>
    </div>

    </div>
  );
};

export default Profile;
