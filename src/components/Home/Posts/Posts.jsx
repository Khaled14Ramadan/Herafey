import React, { useEffect } from 'react';
import Post from '../Post/Post';
import { useContext, useState } from 'react';
import { AuthContext } from './../../../context/AuthContext';
import { query, where, onSnapshot } from 'firebase/firestore';
import { colPost } from './../../../firebase';




const Posts = ({page}) => {
  const [posts, setPosts] = useState([])
  const { currentUser } = useContext(AuthContext);

  //real time collection data
  /// where("uid" , "in" , currentUser.following)
  useEffect(() => {
    //home
    console.log('following' ,currentUser.following);
    let arr=[currentUser.uid];
    if(currentUser.following){
      arr = [...arr , ...currentUser.following];
    }
    let q = query(colPost, where("uidUser" , "in" , arr));
    if(page=== 'profile'){
      //profile
      q = query(colPost, where("uidUser", "==", currentUser.uid));
    }
    const getPosts = async () => {
      await onSnapshot(q, ((s) => {
        let postss = [];
        s.docs.forEach((d) => {
          postss.push({ ...d.data() ,hour:new Date(d.data().createAt.seconds*1000).getHours() ,
             secound: new Date(d.data().createAt.seconds*1000).getMinutes() , createAt: new Date(d.data().createAt.seconds*1000)});
        });
        console.log(postss);
        postss.sort(function(a,b){
          return new Date(b.createAt) - new Date(a.createAt);
        })
        console.log(postss);
        setPosts(postss);

        console.log(posts);
      }));

    }
    getPosts();

  }, [])

  console.log(posts);

  return (
    <div className="Posts">
      {posts.length>0 && posts.map((PostData , index) => (
         <Post data={PostData} uid={currentUser.uid} key={index} />
      ))}
    </div>
  )
}

export default Posts