import React from 'react'
import './PostSide.css'
import PostShare from '../PostShare/PostShare'
import Posts from '../Posts/Posts'
const PostSide = () => {
  return (
    <>
    <PostShare/>
    <Posts page='home'/>
    </>
  )
}

export default PostSide