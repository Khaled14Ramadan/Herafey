import React, { useEffect } from 'react'
import './MainProfile.css'
// import ProfileImage from '../../../assets/images/ProfileCardImg.png';
import Cover from '../../../assets/images/ProfileHeader.jpg'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { coluser } from '../../../firebase';
import { getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import messages from './../../../Locale/messages';


const MainProfile = ({userId}) => {
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [followup, setFollowup] = useState(true);

    // console.log(typeof currentUser.uid);
    const q = query(coluser, where("uid", "==", userId));
    useEffect(() => {
        const s = async () => {
            try {
                const x = await getDocs(q);
                const data = x.docs[0].data();
                console.log(data);
                setUser(data);
                // console.log(user);
            }
            catch (e) {
                console.log(e.message);
            }
        }
        s();
    }, [userId]);

    // console.log(user);
  const language = useSelector((s) => s.lang.lang);
    const {
        job,city,PhoneNumber,Following,Followers,Message,Follow,unFollow
      } = messages[language].profile;

      const followupp = ()=>{
        // let arrFollowing = [...currentUser.Following];
        // if(arrFollowing.includes(userId)){
        if(!followup){
            // arrFollowing.splice(arrFollowing.indexOf(userId) , 1);
            setFollowup(true)
        }
        else {
            // arrFollowing = [...arrFollowing , userId];
            setFollowup(false)
        }
      }

    return (
        <>
            <div className='Profile-Card mt-5'>
                <div className="Profile-Images">
                    <img src={Cover} alt='' />
                    <img src={user.photoURL} alt="" />
                </div>
                <div className="Profile-Name">
                    <span>{user.displayName}</span>
                    {/* <span>{user.job}</span> */}
                    {user.job ? <p> <span className='title'>{job} </span> {user.job} </p> : ''}
                    {user.city ? <p> <span className='title'>{city} </span> {user.city} </p> : ''}
                    {user.phoneNumber ?<p> <span className='title'>{PhoneNumber} </span> {user.phoneNumber} </p>: ''}
                </div>
                <div className="follow-Status">
                    <hr />
                    <div>
                        <div className="follow">
                            {/* <span>{user.following.length}</span> */}
                            <span><Link to='/friends' className='follow-links'>{Following}</Link></span>
                        </div>
                        <div className="follow">
                            {/* <span>{user?.followers.length}</span> */}
                            <span> <Link to='/friends' className='follow-links'>{Followers}</Link></span>
                        </div>
                    </div>
                    <hr />
                </div>
                {currentUser.uid!==userId ? 
                <div className="Pro-Btns">
                <button className='Pro-Btn'> <Link to='/messaging' className='Pro-Link'>{Message} </Link></button>
                <button className='Pro-Btn' onClick={followupp}> {followup? Follow : unFollow}</button>
            </div>
            :''}
            </div>
        </>
    )
}

export default MainProfile