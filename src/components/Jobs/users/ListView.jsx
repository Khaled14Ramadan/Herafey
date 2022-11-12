import React from 'react'
import { Link,Navigate } from 'react-router-dom'
import styles from "./listview.module.scss"
import { useDispatch,useSelector } from 'react-redux'
const ListView = () => {
  const filteredUsers=useSelector((state)=>state.filter.filteredUsers)
  const loading=useSelector((state)=>state.filter.loading)
  const error=useSelector((state)=>state.filter.error)
  const view=useSelector((state)=>state.filter.view)
  const fallbackImg="https://bitsofco.de/content/images/2018/12/broken-1.png"
  const setfallback=(e)=>{
  e.target.src=fallbackImg
  }
  // if(loading){
  //   return(
  //     <p>loading</p>
  //   )
  // }
  // if(error){
  //   return(
  //     <p>error</p>
  //   )
  // }
  return (
    <>
{filteredUsers?.length > 0 && !loading &&filteredUsers.map((user)=>(
  <section className={styles.listviewWrapper}>
  <article className="mb-2">
  <div className={styles.imgContainer}>
    <Link to={`/profile/${user.uid}`}>
    <img src={user.photoURL} onError={setfallback}/>
    </Link>
  </div>
<div className='ps-1 pt-2'>
  <h4>{user.displayName}</h4>
  <h5 className={styles.price}>{user.city}</h5>
  <p>{user.job}</p>
</div>
</article>

</section>
))}
  </>
  )

}

export default ListView