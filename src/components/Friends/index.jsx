import React from 'react'
import styels from "./friends.module.scss"
import Button from "../Jobs/users/Button"
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
const Friends = () => {
  const dispatch=useDispatch()
  const followers=useSelector((state)=>state.friends.followersarr)
  const following=useSelector((state)=>state.friends.followingarr)
if(followers.length==0&&following.length==0){
  return(
    <div className="w-100  text-center">
You arent followed or follow anyone yet 
    </div>
  )
}
  return (
    <div className={`container `}>
<div className={`${styels.btncontainer} d-flex justify-content-center`}>
  <button className={`me-2 ${styels.active}`}>Followers</button>
  <button className={`ms-2`}>Following</button>
</div>
<section className={`row mt-md-3 `}>
<div className={`col-12 col-md-4 ${styels.person} py-2  d-flex justify-content-between align-items-center offset-md-4 ${styels.personcontainer}`}>
<div className={`d-flex align-items-center`}>
  <div className={`${styels.imgcontainer}`}>
    <img src="https://pbs.twimg.com/profile_images/1569675493003202560/9ft8yF8g_400x400.jpg" className="img-fluid rounded-circle" alt="" />
  </div>
  <h5 className="ps-2"> andy ahmed</h5>
</div>
<Link>
<Button>profile</Button>
</Link>
</div>
{/* <div className={`col-12 col-md-4 bg-danger offset-md-4`}>
askdjaskd
</div> */}
</section>
    </div>
  )
}

export default Friends