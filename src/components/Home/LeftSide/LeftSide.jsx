import React from 'react';
import FollowesSection from '../FollowersSection/FollowersSection';
import ProfileSection from './../../Profile/ProfileSection/ProfileSection';


const LeftSide = () => {

  return (
    <div>
        <ProfileSection/>
        <FollowesSection/>
    </div>
  )
}

export default LeftSide