import React from 'react'
import LeftSide from './LeftSide/LeftSide'
import PostSide from './PostSide/PostSide'
import RightSide from './RightSide/RightSide'
import './home.css'

const Home = () => {
  return (
    <div className='home'>

    <div className="container">
      <div className="row">
        <div className='col-xl-3 col-lg-5 d-lg-block d-none '><LeftSide/> </div>
        <div className='col-xl-6 col-lg-7 col-12' ><PostSide/></div>
        <div className='col-xl-3 d-xl-block d-none'><RightSide/></div>
      </div>
    </div>
    </div>
  )
}

export default Home