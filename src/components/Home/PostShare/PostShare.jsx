import React from 'react'
import './PostShare.css'
import { useSelector } from 'react-redux';
import messages from './../../../Locale/messages';
import { useState } from 'react';
import PostalModal from './postlModal';
import { useContext } from 'react';
import { AuthContext } from './../../../context/AuthContext';

const PostShare = (props) => {
  const { currentUser } = useContext(AuthContext);
//   console.log(currentUser);
    const [showModal, setShowModal] = useState("close");

    const language = useSelector((s) => s.lang.lang);
    const {
        StartaPost,
        Photo,
        Video,
        Event,
        WriteArticle,
    } = messages[language]['Home'];


    const clickHandler = (event) => {
        event.preventDefault();
        if (event.target !== event.currentTarget) {
            return;
        }
        switch (showModal) {
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;
            default:
                setShowModal("close");
                break;
        }
    };
    return (
        <>
            <div className="PostShare mt-5">
                {/* <img src={img1} alt="" />
            <div>
                <input type="text" placeholder={`${WhatYouLookingFor}...`} />
            </div>
            <button> Share </button> */}

                {/* disabled={props.loading ? true : false} */}
                <div className='shareBox text-center border-none d-flexflex-column'>
                    <div>
                        {/* <img src={img1} className="mx-2" alt="" /> */}
                        {currentUser.photoURL ? 
                        <img className='userImg' src={currentUser.photoURL} alt="" /> : 
                        <img className='userImg' src="/images/user.svg" alt="" />}
                        <button onClick={clickHandler} className="px-4">
                            {StartaPost}
                        </button>
                    </div>
                    <div>
                        <button>
                            <img src="/images/photo-icon.svg" className="mx-2" alt="" />
                            <span>{Photo}</span>
                        </button>
                        <button>
                            <img src="/images/video-icon.svg" className="mx-2" alt="" />
                            <span>{Video}</span>
                        </button>
                        <button>
                            <img src="/images/event-icon.svg" className="mx-2" alt="" />
                            <span>{Event}</span>
                        </button>
                        <button>
                            <img src="/images/article-icon.svg" className="mx-2" alt="" />
                            <span>{WriteArticle}</span>
                        </button>
                    </div>
                </div>
            </div>

            <PostalModal showModal={showModal} clickHandler={clickHandler} />
        </>
    )
}

export default PostShare