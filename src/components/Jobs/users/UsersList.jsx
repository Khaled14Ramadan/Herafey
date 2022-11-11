import React from 'react'
import GridView from './GridView'
import ListView from './ListView'
import { useSelector } from 'react-redux'
import messages from '../../../Locale/messages'
import Spinner from 'react-bootstrap/Spinner';
import styles from "./userlist.module.scss"

const UsersList = () => {
  const lang=useSelector((state)=>state.lang.lang)

  const view=useSelector((state)=>state.filter.view)
const isfilterEmpty=useSelector((state)=>state.filter.filterVal)
const filteredUsers=useSelector((state)=>state.filter.filteredUsers)
const loading=useSelector((state)=>state.filter.loading)
const{noitems,noitemsFound}=messages[lang].Jobs
if(!isfilterEmpty){
  return (
    <p className={` text-center ${styles.noitems}`}>{noitems}</p>
  )
}
if(loading){
  return(
    <div className={`d-flex justify-content-center align-items-center ${styles.loader}`}> 
    <Spinner animation="grow" />
    </div>
  )
}
if(isfilterEmpty&&filteredUsers?.length==0&&!loading){
  return(
  <p className={` text-center`}>{noitemsFound}</p>
  )
}
  if(view=="list"&&filteredUsers?.length>0&&!loading){
    return(
      <ListView>
        
      </ListView>
    )
  }
  
  return (
    <GridView>

    </GridView>
    )
}

export default UsersList