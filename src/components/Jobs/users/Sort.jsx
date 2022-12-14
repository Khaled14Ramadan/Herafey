import React from 'react'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import styles from "./sort.module.scss"
import { useSelector,useDispatch } from 'react-redux'
import { changeview ,setsort} from '../../../Redux/FiltersSlice/filtersslice' 
import messages from '../../../Locale/messages'
const Sort = () => {
  const view=useSelector((state)=>state.filter.view)
  const filteredcontent=useSelector((state)=>state.filter.filteredUsers)
  const selected=useSelector((state)=>state.filter.sortVal)
  const lang=useSelector((state)=>state.lang.lang)
  const dispatch=useDispatch()
  const formatNumber=(nums)=>{
    let num=0
if(lang=="ar"){
  num=nums.toLocaleString("ar-EG")

} else{
 num= nums.toLocaleString("en-US")
}
return num
  }
  const{sortby,usersfound,sortcriteria}=messages[lang].Jobs
  const changesort=(e)=>{
    dispatch(setsort(e.target.value))
  }
  return (
    <section className={styles.sortsection}>
    <div className={styles.btnContainer}>
    <button onClick={()=>dispatch(changeview("grid"))} className={view==="grid"?styles.active:""}>
      <BsFillGridFill/>
    </button>
    <button onClick={()=>dispatch(changeview("list"))} className={view==="list"?styles.active:""}>
      <BsList/>
    </button>
    </div>
    <p className="mb-0">{filteredcontent?.length==0?formatNumber(0):formatNumber(filteredcontent.length)} {usersfound}</p>
    <hr/>
    <form>
      <label htmlFor="sort" className={lang=="en"?"me-2":"ms-2"}>{sortby}</label>
      <select name="sort" id="sort" className={styles.sortInput} onChange={changesort} disabled={filteredcontent?.length<=0}>
      {/* <option value="none" selected={filteredcontent?.length>0} disabled hidden>sort by</option> */}

        {sortcriteria.map((item,index)=>(
                  <option key={index} value={item}>{item}</option>

        ))}
    
      </select>
    </form>
      </section>
    )
}

export default Sort