import React from "react";
import styles from "./filters.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { toogleSideBar,setloc,setfilterval,fetchUsers,setlocerror } from "../../../Redux/FiltersSlice/filtersslice";
import { FaBars } from "react-icons/fa";
import messages from "../../../Locale/messages";
import logos from "../../../extras/joblogos";
import logosar from "../../../extras/joblogosar";
const Filters = (props) => {
  const sidebar = useSelector((state) => state.filter.isSideBarOpen);
  const selected = useSelector((state) => state.filter.locationVal);
  const filterForStyle = useSelector((state) => state.filter.filterVal);
  const locerror = useSelector((state) => state.filter.locerror);

  const lang = useSelector((state) => state.lang.lang);
  const dispatch = useDispatch();
  const getselectValue=(e)=>{
    dispatch(setloc(e.target.value))
    if(filterForStyle!==""){
      dispatch(fetchUsers({val:filterForStyle,loc:e.target.value}))
    } else{
      dispatch(setlocerror(true))

    }

  }
  const dispatchFilter=(val)=>{
    if(locerror){
      dispatch(setlocerror(false))
    }
    if(sidebar){
      dispatch(toogleSideBar())
    }
dispatch(setfilterval(val))
if(selected!==""){
  dispatch(fetchUsers({val:val,loc:selected}))

} else{
  dispatch(fetchUsers(val))
}
  }
  const toggle = () => {
    dispatch(toogleSideBar());
  };
  const { filtertext,cities,location,loctitle,defaultforloc,jobs,filtertitle } = messages[lang].Jobs;
  const{filterjobs}=messages["en"].Jobs
  const filterfunc=(job)=>{
    const finds=(arr)=>{
      return arr.includes(job)
        }
      return  filterjobs.find(finds)
  }
  return (
    <>
      <button
        style={sidebar ? { display: "none" } : {}}
        className={
          lang == "ar"
            ? `${styles.togglebtn} ${styles.togglebtnarabic} `
            : styles.togglebtn
        }
        onClick={toggle}
      >
        <FaBars /> {filtertext}
      </button>
      <div
        className={`${styles.content} py-3  ${props.show ? "container" : ""}`}
      >
        <div
          className={
            props.show ? `row g-3 px-1  ` : `row g-3 px-3 ${styles.hide}`
          }
        >
          <h2 className="text-center">{filtertitle}</h2>
          <h3 className={styles.loctitle}>{jobs}</h3>
          {lang==="en"&&logos.map((logo,index)=>(
 <div
 className={
   props.show
     ? `col-2 text-center ${styles.filterLogo} ${filterForStyle===""?"":filterForStyle.includes(logo.job)?"":styles.notactivelogo}`
     : `col-3 text-center   col-md-4 ${styles.filterLogo} ${filterForStyle===""?"":filterForStyle.includes(logo.job)?"":styles.notactivelogo}`
 }
 key={index}
>
 <div className={`${styles.logoContainer} ${!props.show?"d-flex flex-column justify-content-center align-items-center":""} `}>
   <img
     src={logo.logoSrc}
     className="img-fluid"
     alt=""
     onClick={()=>{dispatchFilter(filterfunc(logo.job))}}
   />
    <span className="pt-1">{logo.job}</span>
 </div>
</div>

          ))}
           {lang=="ar"&&logosar.map((logo,index)=>(
 <div
 className={
   props.show
     ? `col-2 text-center ${styles.filterLogo} ${filterForStyle===""?"":filterForStyle.includes(logo.job)?"":styles.notactivelogo}`
     : `col-3 text-center   col-md-4 ${styles.filterLogo} ${filterForStyle===""?"":filterForStyle.includes(logo.job)?"":styles.notactivelogo}`
 }
 key={index}
>
 <div className={`${styles.logoContainer} ${!props.show?"d-flex flex-column justify-content-center align-items-center":""}  `}>
   <img
     src={logo.logoSrc}
     className="img-fluid"
     alt=""
     onClick={()=>{dispatchFilter(filterfunc(logo.job))}}
   />
 </div>
 <span>{logo.job}</span>
</div>

          ))}
          <div className="">
<h3 className={styles.loctitle}>{loctitle}</h3>
<div className="pt-1">
<label htmlFor="location" className="me-1">{location}</label>
      <select name="location" id="location" className={styles.sortInput} disabled={filterForStyle==""} defaultValue={defaultforloc}  onChange={getselectValue}>
      <option value={defaultforloc}  disabled >{defaultforloc}</option>
    {cities.map((city,index)=>(
              <option key={index}  value={city}>{city}</option>

    ))}
      </select>
      {locerror&&<span className="text-danger">please choose a job</span>}
</div>

        </div>
        </div>
      
      </div>
    </>
  );
};

export default Filters;
