import React from 'react'
import styles from"./user.module.scss"
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Product = () => {
  const dispatch=useDispatch()
  const filteredUsers=useSelector((state)=>state.filter.filteredUsers)
  const error=useSelector((state)=>state.filter.error)
  const loading=useSelector((state)=>state.filter.loading)

  console.log(filteredUsers);
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
        <section className="overflow-hidden">
        <div className={`d-flex justify-content-center`}>
          <Link to={`/profile/${user.uid}`}>
          <img className="rounded-circle img-fluid" src={user.photoURL}/>

          </Link>
        </div>
        <footer>
          <h5 className="pb-1"> {user.displayName}</h5>
          <p>{user.job}</p>
        </footer>
        
      </section>
    ))}

    {/* <section>
    <div className={`d-flex justify-content-center`}>
      <img className="rounded-circle img-fluid" src="https://dl.airtable.com/.attachmentThumbnails/89ba7458c24252be77f5a835dd398880/c13ef359"/>
    </div>
    <footer>
      <h5 className="pb-1">Marwan mohamed </h5>
      <p>11111</p>
    </footer>
    
  </section> */}
  {/* <section>
    <div className={`d-flex justify-content-center`}>
      <img className="rounded-circle img-fluid" src="https://dl.airtable.com/.attachmentThumbnails/89ba7458c24252be77f5a835dd398880/c13ef359"/>
    </div>
    <footer>
      <h5 className="pb-1">Marwan mohamed </h5>
      <p>11111</p>
    </footer>
    
  </section> */}
  {/* <section>
    <div className="d-flex justify-content-center">
      <img className="rounded-circle img-fluid" src="https://dl.airtable.com/.attachmentThumbnails/89ba7458c24252be77f5a835dd398880/c13ef359"/>
    </div>
    <footer>
      <h5>Name</h5>
      <p>Rating</p>
    </footer>
  </section>
  <section>
    <div className="d-flex justify-content-center">
      <img className="rounded-circle img-fluid" src="https://dl.airtable.com/.attachmentThumbnails/89ba7458c24252be77f5a835dd398880/c13ef359"/>
    </div>
    <footer>
      <h5>ajsd</h5>
      <p>123</p>
    </footer>
  </section>
  <section>
    <div className="d-flex justify-content-center">
      <img className="rounded-circle img-fluid" src="https://dl.airtable.com/.attachmentThumbnails/89ba7458c24252be77f5a835dd398880/c13ef359"/>
    </div>
    <footer>
      <h5>ajsd</h5>
      <p>123</p>
    </footer>
  </section> */}
 
    </>

    )
}

export default Product