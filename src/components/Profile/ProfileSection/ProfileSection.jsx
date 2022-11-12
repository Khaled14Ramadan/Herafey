import React, { useEffect } from 'react'
import './profile.css'
// import ProfileImage from '../../../assets/images/ProfileCardImg.png'
import Cover from '../../../assets/images/ProfileHeader.jpg'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { coluser } from '../../../firebase';
import { getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import messages from './../../../Locale/messages';


const ProfileSection = () => {
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState({});
    // console.log(typeof currentUser.uid);

    useEffect(() => {
        const s = async () => {
            const q = query(coluser, where("uid", "==", currentUser.uid));
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
        if(currentUser.uid){
            s();
        }
    }, []);

    const language = useSelector((s) => s.lang.lang);
    const {
        job, Following, Followers,MyProfile
    } = messages[language].profile;

    return (
        <>
            <div className='ProfileCard mt-5'>
                <div className="ProfileImages">
                    <img src={Cover} alt="CoverImage" />
                    <img src={user.photoURL} alt="ProfileImage" />
                </div>
                <div className="ProfileName">
                    <span>{user.displayName}</span>
                    {user.job ? <p> <span className='title'>{job} </span> {user.job} </p> : ''}
                </div>
                <div className="followStatus">
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
                <span> <Link to={`/profile/${currentUser.uid}`} className='ProLink'>{MyProfile} </Link></span>
            </div>
        </>
    )
}

export default ProfileSection