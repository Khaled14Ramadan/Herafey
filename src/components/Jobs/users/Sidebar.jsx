import React from 'react'
import styles from "./sidebar.module.scss"
import { FaTimes } from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import{toogleSideBar} from "../../../Redux/FiltersSlice/filtersslice"
import Filters from './Filters'
const Sidebar = () => {
    const sidebar=useSelector((state)=>state.filter.isSideBarOpen)
const dispatch=useDispatch()
  return (
    <div>
 <aside className={`${sidebar?`${styles.sidebar} ${styles.showsidebar} `:styles.sidebar}`}>
    <div className={styles.sidebarheader}>
      <img src='' className={styles.logo}/>
      <button className={styles.closebtn} onClick={()=>dispatch(toogleSideBar())}><FaTimes/></button>
    </div>
    
 <Filters show={true}/>
  </aside>
    </div>
   
  )
}

export default Sidebar