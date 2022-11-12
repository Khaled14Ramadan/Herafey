import React, { useContext, useEffect, useState } from "react";
import { where, getDocs, query, collection } from "firebase/firestore";
import { db } from "../../firebase";
import styels from "./friends.module.scss";
import Button from "../Jobs/users/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import {
  toggleactivetab,
  fetchfollowing,
  fetchfollowers,
  togglealready,
} from "../../Redux/friendsslice/friendsslice";
import messages from "../../Locale/messages";
import ProfileSection from "../Profile/ProfileSection/ProfileSection";
import FollowersSection from "../Home/FollowersSection/FollowersSection";
const Friends = () => {
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const active = useSelector((state) => state.friends.activetab);
  const alreadyloaded = useSelector((state) => state.friends.alreadyloaded);

  const followers = useSelector((state) => state.friends.followersarr);
  const following = useSelector((state) => state.friends.followingarr);
  const lang = useSelector((state) => state.lang.lang);
  const [user, setUser] = useState({});
  const loading = useSelector((state) => state.friends.loading);
  const [test, settest] = useState([]);
  const showList = (active, arr) => {
    dispatch(toggleactivetab(active));
    dispatch(togglealready(true));
    dispatch(fetchfollowing(arr));
  };
  const showFollowers = (active, arr) => {
    dispatch(toggleactivetab(active));
    dispatch(togglealready(true));
    dispatch(fetchfollowers(arr));
  };
  useEffect(() => {
    const s = async () => {
      const s = query(
        collection(db, "users"),
        where("uid", "==", localStorage.getItem("uid"))
      );
      try {
        const x = await getDocs(s);
        const data = x.docs[0].data();
        setUser(data);
        const q = query(
          collection(db, "users"),
          where("uid", "in", data.followers)
        );
        const querySnapshot = await getDocs(q);
        const si = [];
        querySnapshot.forEach((doc) => {
          si.push(doc.data());
        });
        settest(si);
      } catch (e) {
        console.log(e.message);
      }
    };
    s();
  }, []);
  if (loading === true) {
    return (
      <div
        className={`d-flex justify-content-center align-items-center  ${styels.loader}`}
      >
        <Spinner animation="grow" />
      </div>
    );
  }
  return (
    <div className={`container `}>
      <div className={`${styels.btncontainer} d-flex justify-content-center `}>
        <button
          onClick={() => showFollowers("followers", user.followers)}
          className={`me-2 ${active === "followers" ? styels.active : ""}`}
        >
          {lang === "ar" ? messages[lang].following : "following"}
        </button>
        <button
          className={`ms-2 ${active === "following" ? styels.active : ""}`}
          onClick={() => showList("following", user.following)}
        >
          {lang === "ar" ? messages[lang].followers : "followers"}
        </button>
      </div>
      <section className={`row mt-md-3 gx-5`}>
        <div className={`col-md-4 mt-1 ${styels.hide}`}>
          <ProfileSection />
        </div>

        <div className="col-md-4 mt-md-5">
          {/* {followers.length==0&&following.length==0&&test.length==0&&    <div className={`  text-center ${styels.nousers}`}>
Click on the tabs above to see if you have any connections 
    </div>} */}
          {!alreadyloaded &&
            test?.length > 0 &&
            test.map((item) => (
              <div className="row">
                <div
                  className={`col-12 mb-2 px-2 ${styels.person} py-2 h-auto  d-flex justify-content-between align-items-center  ${styels.personcontainer}`}
                >
                  <div className={`d-flex align-items-center`}>
                    <div className={`${styels.imgcontainer}`}>
                      <img
                        src={item.photoURL}
                        className="img-fluid rounded-circle"
                        alt=""
                      />
                    </div>
                    <div>
                      <h5 className="ps-2"> {item.displayName}</h5>
                      <h5 className="ps-2"> {item.job} </h5>
                    </div>
                  </div>
                  <Link to={`/profile/${item.uid}`}>
                    <Button>profile</Button>
                  </Link>
                </div>
              </div>
            ))}
          {active === "following" && following?.length > 0 && loading === "done"
            ? following.map((item) => (
                <div className="row">
                  <div
                    className={`col-12 mb-2 px-2 ${styels.person} py-2 h-auto  d-flex justify-content-between align-items-center  ${styels.personcontainer}`}
                  >
                    <div className={`d-flex align-items-center`}>
                      <div className={`${styels.imgcontainer}`}>
                        <img
                          src={item.photoURL}
                          className="img-fluid rounded-circle"
                          alt=""
                        />
                      </div>
                      <div className={`${lang === "ar" ? "pe-2" : "ps-2"}`}>
                        <h5 className="ps-2"> {item.displayName}</h5>
                        <h5 className="ps-2"> {item.job} </h5>
                      </div>
                    </div>
                    <Link to={`/profile/${item.uid}`}>
                      <Button>profile</Button>
                    </Link>
                  </div>
                </div>
              ))
            : ""}
          {active === "followers" && followers?.length > 0 && loading === "done"
            ? followers.map((item) => (
                <div className="row">
                  <div
                    className={`col-12  ${styels.person} py-2  d-flex justify-content-between align-items-center  ${styels.personcontainer}`}
                  >
                    <div className={`d-flex align-items-center`}>
                      <div className={`${styels.imgcontainer}`}>
                        <img
                          src={item.photoURL}
                          className="img-fluid rounded-circle"
                          alt=""
                        />
                      </div>
                      <h5 className={`${lang === "ar" ? "pe-2" : "ps-2"}`}>
                        {" "}
                        {item.displayName}
                      </h5>
                    </div>
                    <Link to={`/profile/${item.uid}`}>
                      <Button>profile</Button>
                    </Link>
                  </div>
                </div>
              ))
            : ""}
          {active === "following" &&
            following?.length === 0 &&
            loading === "done" && <p>you arent following anyone yet</p>}
          {active === "followers" && followers?.length === 0 && !loading && (
            <p>you arent being followed by anyone yet</p>
          )}
        </div>

        <div className={`col-md-4 mt-0 ${styels.hide}`}>
          <FollowersSection />
        </div>
      </section>
    </div>
  );
};

export default Friends;
