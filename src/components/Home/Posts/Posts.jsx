import React, { useEffect } from 'react';
import Post from '../Post/Post';
import { useContext, useState } from 'react';
import { AuthContext } from './../../../context/AuthContext';
import { query, where, onSnapshot } from 'firebase/firestore';
import { colPost, coluser } from './../../../firebase';
import { getDocs } from 'firebase/firestore';




const Posts = ({page}) => {
  const [posts, setPosts] = useState([])
  const { currentUser } = useContext(AuthContext);

  //real time collection data
  /// where("uid" , "in" , currentUser.following)
  useEffect(() => {
    //home
    console.log(currentUser.uid);
    let id = currentUser.uid;
    let arr=[];
    const x = query(coluser, where("uid", "==", id));
    getDocs(x).then((s)=>{
      arr = s.docs[0].data().following;
      console.log(s.docs[0].data())});

      arr.push(currentUser.uid);
      console.log(arr);
      
    let q = query(colPost, where("uidUser" , "in" , arr));
    // let q = query(colPost, where("name",'==','khaled'));
    if(page=== 'profile'){
      //profile
      q = query(colPost, where("uidUser", "==", currentUser.uid));
    }
    const getPosts = async () => {
      await onSnapshot(q, ((s) => {
        let postss = [];
        s.docs.forEach((d) => {
          postss.push({ ...d.data() ,createAt: new Date(d.data().createAt.seconds*1000)});
        });
        // console.log(postss);
        postss.sort(function(a,b){
          return new Date(b.createAt) - new Date(a.createAt);
        })
        // console.log(postss);
        setPosts(postss);

        // console.log(posts);
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