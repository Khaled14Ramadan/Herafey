import React from 'react'
import './Post.css'
import Comment from "../../../assets/images/comment.png";
import Share from "../../../assets/images/share.png";
import Heart from "../../../assets/images/like.png";
import NotLike from "../../../assets/images/notlike.png";
import { useSelector } from 'react-redux';
import messages from './../../../Locale/messages';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './../../../firebase';

const Post = ({ data , uid }) => {

  // console.log(data);

  const clacTime= (d)=>{
    let time='';
    if(new Date().getDate() - d.getDate() > 0)
    {
      time +=new Date().getDate() - d.getDate()+'d';
    }
    else if(new Date().getHours() - d.getHours() > 0){
      time +=new Date().getHours() - d.getHours()+'h';
    }
    else if(new Date().getMinutes() - d.getMinutes() > 0){
      time +=new Date().getMinutes() - d.getMinutes()+'m';
    }
    else {
      time = 'now';
    }
    return time;
  }

  const activeLike =()=>{
    let newCount ;
    let newArr = [...data.likes.WhoLike];
    let active= true;
    if(newArr.includes(uid)){
      newCount = data.likes.count-1;
      newArr.splice(newArr.indexOf(uid),1);
      active = false;
    }
    else {
      newCount = data.likes.count+1;
      newArr.push(uid);
    }
    console.log(newArr);
    const docRef = doc(db , 'Posts' , data.id);
    console.log(docRef);
    updateDoc(docRef , {...data , liked:active , likes :{
      count : newCount,
      WhoLike:newArr,
    }})
  }


  const language = useSelector((s) => s.lang.lang);
  const {
    Likes,
  } = messages[language]['Home'];
  return (
    <div className="Post mb-3 mt-3">
      <div className="detail d-flex">
        {data.userImg?<img src={data.userImg} className='me-2' alt='' />:<img src="/images/user.svg" alt="" />}
        <div>
          <div className='pe-2 name'>{data.name}</div>
          <div className='date mx-1'>{clacTime(data.createAt)}</div>
        </div>
      </div>
      <span className='post-dec'>{data.description}</span>
      {data?.postImg ? <img src={data.postImg} alt="" /> : ""}
      <div className="postReactions">
        <img src={data.liked ? Heart : NotLike} alt="" onClick={activeLike} style={{ cursor: "pointer" }} />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span className='likes'>
        {data.likes.count} {Likes}
      </span>

    </div>
  )
}

export default Post