import React from 'react'
import './FollowersSection.css'
import img1 from "../../../assets/images/img1.png";
import img2 from "../../../assets/images/img2.png";
import img3 from "../../../assets/images/img3.png";
import img4 from "../../../assets/images/img4.jpg";
import { useSelector } from 'react-redux';
import messages from './../../../Locale/messages';

const FollowersSection = () => {

  const language = useSelector((s)=>s.lang.lang);

  const {
    WhoFollowingYou,
    Follow,
  } = messages[language]['Home'];
  console.log(WhoFollowingYou)
  const Followers = [
    { name: "Andrew Thomas", username: "AndrewThomas", img: img1 },
    { name: "Hulk Buster", username: "HulkBuster", img: img2 },
    { name: "Thor", username: "ThunderMaster", img: img3 },
    { name: "Natasha", username: "Natasha", img: img4 },
  ]
  return (
  <div className="FollowersCard mt-5">
    <h3> {WhoFollowingYou} </h3>
    {Followers.map((follower)=>{ 
      return (
        <div className="follower">
            <div>
               <img src={follower.img} alt="" className='followerImage' />
              <div className="name">
                <span>{follower.name}</span>
                <span>@{follower.username}</span>
              </div>
            </div>
            <button className='follow-btn'> {Follow} </button>
        </div>
      )
    })}
  </div>  )
}

export default FollowersSection