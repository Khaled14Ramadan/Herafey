import React from "react";
import PostShare from "../Home/PostShare/PostShare";
import FollowersSection from '../Home/FollowersSection/FollowersSection'
import TrendSection from "../Home/TrendSection/TrendSection";
import Posts from "../Home/Posts/Posts";
import MainProfile from './mainProfile/MainProfile';
import './Profile.css'
import { useParams } from "react-router-dom";
const Profile = () => {

  const userId = useParams();
  console.log('id : ',userId);

  return (
    <div className="ProfilePage">

    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-12">
          <MainProfile userId={userId.id}/>
        <PostShare/>
        <Posts page='profile'/>
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
