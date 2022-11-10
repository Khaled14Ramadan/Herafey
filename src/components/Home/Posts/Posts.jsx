import React from 'react'
import Post from '../Post/Post'
import postPic1 from '../../../assets/images/postpic1.jpg'
import postPic2 from '../../../assets/images/postpic2.jpg'
import postPic3 from '../../../assets/images/postpic3.JPG'


const Posts = () => {
  const PostsData = [
    {
        img: postPic1,
        name: 'Sara',
        desc: "Happy New Year all friends! #2023",
        likes: {count:2555 ,
          WhoLikes:[]
        },
        liked: true
    },
    {
        img: postPic2,
        name: 'Aya',
        desc: "Party time :)",
        likes: {count:2555 ,
          WhoLikes:[]
        },
        liked: false

    },
    {
        img:postPic3,
        name: "Salena Gomez",
        desc: "At Archery Festival",
        likes: {count:2555 ,
          WhoLikes:[]
        },
        liked: false
    }
]
  return (
    <div className="Posts">
      {PostsData.map((PostData , id) =>{
        return <Post data={PostData} key={id}/>
      })}
    </div>
    )
}

export default Posts