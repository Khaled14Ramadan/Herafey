import React from 'react'
import styles from"./user.module.scss"
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Product = () => {
  const dispatch=useDispatch()
  const filteredUsers=useSelector((state)=>state.filter.filteredUsers)
  const error=useSelector((state)=>state.filter.error)
  const loading=useSelector((state)=>state.filter.loading)
// const regex=/\.(jpeg|jpg|png|gif)\b/i
const fallbackImg="https://bitsofco.de/content/images/2018/12/broken-1.png"
const setfallback=(e)=>{
e.target.src=fallbackImg
}
// console.log(regex.test("asd.png"));
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
    {filteredUsers?.length > 0 && !loading && filteredUsers.map((user)=>(
        <section className="overflow-hidden" key={user.uid}>
        <div className={`d-flex justify-content-center`}>
          <Link to={`/profile/${user.uid}`}>
          <img className="rounded-circle img-fluid" onError={setfallback}  src={user.photoURL}/>

          </Link>
        </div>
        <footer>
          <h5 className="pb-1"> {user.displayName}</h5>
          <p>{user.job}</p>
        </footer>
        
      </section>
    ))}


 
    </>

    )
}

export default Product