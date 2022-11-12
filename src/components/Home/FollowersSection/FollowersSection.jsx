import React from 'react'
import './FollowersSection.css'
import img1 from "../../../assets/images/img1.png";
import img2 from "../../../assets/images/img2.png";
import img3 from "../../../assets/images/img3.png";
import img4 from "../../../assets/images/img4.jpg";
import { useSelector,useDispatch } from 'react-redux';
import { addtoFollow } from '../../../Redux/followslice/followslice';
import messages from './../../../Locale/messages';
import { useContext } from 'react';
import { AuthContext } from './../../../context/AuthContext';

const FollowersSection = () => {
  const { currentUser } = useContext(AuthContext);
const dispatch=useDispatch()
  const language = useSelector((s)=>s.lang.lang);
const myid=currentUser.uid;
  const {
    WhoFollowingYou,
    Follow,
  } = messages[language]['Home'];

  const follow=(val,id)=>{
dispatch(addtoFollow({toadd:val,userid:id}))
  }
  const Followers = [
    { name: "Andrew Thomas", username: "AndrewThomas", img: img1,id:1 },
    { name: "Hulk Buster", username: "HulkBuster", img: img2,id:2 },
    { name: "Thor", username: "ThunderMaster", img: img3,id:3 },
    { name: "Natasha", username: "Natasha", img: img4,id:"podkiMhrStcDzIp8tQlaqDf6I9H3" },
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
            <button className='follow-btn' onClick={()=>follow(follower.id,myid)}> {Follow} </button>
        </div>
      )
    })}
  </div>  )
}

export default FollowersSection