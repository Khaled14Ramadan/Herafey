import React from 'react'
import './profile.css'
import ProfileImage from '../../../assets/images/ProfileCardImg.png'
import Cover from '../../../assets/images/ProfileHeader.jpg'
import { Link } from 'react-router-dom';

const ProfileSection = () => {

  return (
    <>
    <div className='ProfileCard mt-5'>
        <div className="ProfileImages">
            <img src={Cover} alt="CoverImage" />
            <img src={ProfileImage} alt="ProfileImage" />
        </div>
        <div className="ProfileName">
            <span>Zosar Js</span>
            <span>Front-End Developer</span>
        </div>
        <div className="followStatus">
            <hr/>
            <div>
            <div className="follow">
                <span>1804</span>
                <span>Following</span>
            </div>
            <div className="follow">
                <span>999</span>
                <span>Followers</span>
            </div>
            </div>
            <hr/>
        </div>
        <span> <Link to='/profile'className='ProLink'>My Profile </Link></span>
    </div>
    </>
  )
}

export default ProfileSection