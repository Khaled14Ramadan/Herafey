import React from 'react'
import img1 from "../../../assets/images/img1.png";
import './PostShare.css'
import { useSelector } from 'react-redux';
import messages from './../../../Locale/messages';

const PostShare = () => {
    const language = useSelector((s)=>s.lang.lang);
    const {
        WhatYouLookingFor,
    }=messages[language]['Home'];
  return (
        <div className="PostShare mt-5">
            <img src={img1} alt="" />
            <div>
                <input type="text" placeholder={`${WhatYouLookingFor}...`} />
            </div>
            <button> Share </button>
        </div>  
        )
}

export default PostShare