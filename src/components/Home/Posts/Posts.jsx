import React, { useEffect } from 'react';
import Post from '../Post/Post';
import { useContext, useState } from 'react';
import { AuthContext } from './../../../context/AuthContext';
import { query, where, onSnapshot } from 'firebase/firestore';
import { colPost, coluser } from './../../../firebase';
import { getDocs } from 'firebase/firestore';
import { async } from '@firebase/util';




const Posts = ({ page , userId }) => {
  const [posts, setPosts] = useState([])
  const { currentUser } = useContext(AuthContext);

  //real time collection data
  /// where("uid" , "in" , currentUser.following)
  useEffect(() => {
    //home
    // console.log(currentUser.uid);
    if (currentUser.uid) {



      // let q = query(colPost, where("name",'==','khaled'));
      if (page === 'profile') {
        //profile
        const q = query(colPost, where("uidUser", "==", userId));
        getPosts(q);
      }
      else {
        let id = currentUser.uid;
        let arr = [];
        const changeArr = async () => {
          const x = await query(coluser, where("uid", "==", id));
          await getDocs(x).then((s) => {
            arr = [...arr, ...s.docs[0].data().following];
            // console.log(s.docs[0].data());
            console.log(arr);
            let q = query(colPost, where("uidUser", "in", arr));
            getPosts(q);
          });
        }

        changeArr()

        console.log(arr.push(currentUser.uid));
        console.log(arr);
      }

    }

  }, [userId]);

  const getPosts = async (q) => {
    await onSnapshot(q, ((s) => {
      let postss = [];
      s.docs.forEach((d) => {
        postss.push({ ...d.data(), createAt: new Date(d.data().createAt.seconds * 1000) });
      });
      // console.log(postss);
      postss.sort(function (a, b) {
        return new Date(b.createAt) - new Date(a.createAt);
      })
      // console.log(postss);
      setPosts(postss);

      // console.log(posts);
    }));

  }

  console.log(posts);

  return (
    <div className="Posts">
      {posts.length > 0 && posts.map((PostData, index) => (
        <Post data={PostData} uid={currentUser.uid} key={index} />
      ))}
    </div>
  )
}

export default Posts