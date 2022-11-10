import React from 'react'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import styles from "./sort.module.scss"
import { useSelector,useDispatch } from 'react-redux'
import { changeview } from '../../../Redux/FiltersSlice/filtersslice' 
import messages from '../../../Locale/messages'
const Sort = () => {
  const view=useSelector((state)=>state.filter.view)
  const lang=useSelector((state)=>state.lang.lang)
  const dispatch=useDispatch()
  const{sortby,usersfound,sortcriteria}=messages[lang].Jobs
  return (
    <section className={styles.sortsection}>
    <div className={styles.btnContainer}>
    <button onClick={()=>dispatch(changeview("grid"))} className={view=="grid"?styles.active:""}>
      <BsFillGridFill/>
    </button>
    <button onClick={()=>dispatch(changeview("list"))} className={view=="list"?styles.active:""}>
      <BsList/>
    </button>
    </div>
    <p className="mb-0">0 {usersfound}</p>
    <hr/>
    <form>
      <label htmlFor="sort" className={lang=="en"?"me-2":"ms-2"}>{sortby}</label>
      <select name="sort" id="sort" className={styles.sortInput}>
       
        {sortcriteria.map((item,index)=>(
                  <option key={index} value={item}>{item}</option>

        ))}
    
      </select>
    </form>
      </section>
    )
}

export default Sort