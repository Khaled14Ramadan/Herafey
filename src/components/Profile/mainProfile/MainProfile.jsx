import React, { useEffect } from 'react'
import './MainProfile.css'
import ProfileImage from '../../../assets/images/ProfileCardImg.png'
import Cover from '../../../assets/images/ProfileHeader.jpg'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { coluser } from '../../../firebase';
import { getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';

const MainProfile = () => {
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
                console.log(user);
            }
            catch (e) {
                console.log(e.message);
            }
        }
        s();
    }, []);

    // console.log(user);



    return (
        <>
            <div className='Profile-Card mt-5'>
                <div className="Profile-Images">
                    <img src={Cover} alt="Cover-Image" />
                    <img src={user.photoURL} alt="ProfileImage" />
                </div>
                <div className="Profile-Name">
                    <span>{user.displayName}</span>
                    {/* <span>{user.job}</span> */}
                    {user.job ? <p> <span className='title'>job : </span> {user.job} </p> : ''}
                    {user.phoneNumber ? <span>Phone Number : {user.phoneNumber} </span> : ''}
                </div>
                <div className="follow-Status">
                    <hr />
                    <div>
                        <div className="follow">
                            <span>1804</span>
                            <span><Link to='/' className='follow-links'>Following</Link></span>
                        </div>
                        <div className="follow">
                            <span>999</span>
                            <span> <Link to='/' className='follow-links'>Followers</Link></span>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="Pro-Btns">
                    <button className='Pro-Btn'> <Link to='/home' className='Pro-Link'>Message </Link></button>
                    <button className='Pro-Btn'> <Link to='/home' className='Pro-Link'>Follow </Link></button>
                </div>
            </div>
        </>
    )
}

export default MainProfile