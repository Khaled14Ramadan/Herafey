import React, { useContext, useEffect } from "react";
import "./FollowersSection.css";
import img1 from "../../../assets/images/img1.png";
import img2 from "../../../assets/images/img2.png";
import img3 from "../../../assets/images/img3.png";
import img4 from "../../../assets/images/img4.jpg";
import { useSelector, useDispatch } from "react-redux";
import { addtoFollow, newusers } from "../../../Redux/followslice/followslice";
import messages from "./../../../Locale/messages";
import { AuthContext } from "../../../context/AuthContext";

const FollowersSection = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const dispatch = useDispatch();
  const language = useSelector((s) => s.lang.lang);
  const myid = localStorage.getItem("uid");
  console.log(myid);
  const userss = useSelector((u) => u.follow.users);
  console.log(userss);
  const { WhoFollowingYou, Follow } = messages[language]["Home"];
  const follow = (val, id) => {
    dispatch(addtoFollow({ toadd: val, userid: id }));
  };
  useEffect(() => {
    dispatch(newusers());
  }, []);
  console.log(userss);
  const Followers = [
    { name: "Andrew Thomas", username: "AndrewThomas", img: img1, id: 1 },
    { name: "Hulk Buster", username: "HulkBuster", img: img2, id: 2 },
    { name: "Thor", username: "ThunderMaster", img: img3, id: 3 },
    {
      name: "Natasha",
      username: "Natasha",
      img: img4,
      id: "podkiMhrStcDzIp8tQlaqDf6I9H3",
    },
  ];
  return (
    <div className="FollowersCard mt-5">
      <h3> {WhoFollowingYou} </h3>
      {userss?.map((follower) => {
        return (
          <div className="follower">
            <div>
              <img src={follower.photoURL} alt="" className="followerImage" />
              <div className="name">
                <span>{follower.displayName}</span>
                <span>@{follower.username}</span>
              </div>
            </div>
            <button
              className="follow-btn"
              onClick={() => follow(follower.uid, myid)}
            >
              {" "}
              {Follow}{" "}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowersSection;