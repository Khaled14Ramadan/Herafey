import React from 'react'
import './Post.css'
import Comment from "../../../assets/images/comment.png";
import Share from "../../../assets/images/share.png";
import Heart from "../../../assets/images/like.png";
import NotLike from "../../../assets/images/notlike.png";
import { useSelector } from 'react-redux';
import messages from './../../../Locale/messages';

const Post = ({data}) => {

  const language = useSelector((s)=>s.lang.lang);
  const {
    Likes,
  }=messages[language]['Home'];
  return (
    <div className="Post mb-3 mt-3">
    <img src={data.img} alt=""/>
    <div className="postReactions">
      <img src={data.liked ? Heart : NotLike} alt="" style={{ cursor: "pointer" }}/>
      <img src={Comment} alt="" />
      <img src={Share} alt="" />
    </div>

    <span className='likes'>
      {data.likes.count} {Likes}
    </span>

    <div className="detail">
      <span className='pe-3'>{data.name}</span>
      <span>{data.desc}</span>
    </div>
  </div>
  )
}

export default Post