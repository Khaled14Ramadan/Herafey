import React from 'react'
import GridView from './GridView'
import ListView from './ListView'
import { useSelector } from 'react-redux'
import messages from '../../../Locale/messages'
const UsersList = () => {
  const lang=useSelector((state)=>state.lang.lang)

  const view=useSelector((state)=>state.filter.view)
const isfilterEmpty=useSelector((state)=>state.filter.filterVal)
const{noitems}=messages[lang].Jobs
if(!isfilterEmpty){
  return (
    <p className={` text-center`}>{noitems}</p>
  )
}
  if(view=="list"){
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