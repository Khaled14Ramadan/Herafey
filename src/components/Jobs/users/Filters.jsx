import React from "react";
import styles from "./filters.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { toogleSideBar,setloc,setfilterval } from "../../../Redux/FiltersSlice/filtersslice";
import { FaBars } from "react-icons/fa";
import messages from "../../../Locale/messages";
import { useState,useEffect } from "react";
import logos from "../../../extras/joblogos";
import logosar from "../../../extras/joblogosar";
const Filters = (props) => {
  const sidebar = useSelector((state) => state.filter.isSideBarOpen);
  const selected = useSelector((state) => state.filter.locationVal);
  const filterForStyle = useSelector((state) => state.filter.filterVal);
  const lang = useSelector((state) => state.lang.lang);
  const dispatch = useDispatch();
  const getselectValue=(e)=>{
    dispatch(setloc(e.target.value))
  }
  const dispatchFilter=(val)=>{
dispatch(setfilterval(val))
  }
//   useEffect( () => {
//  fetch(`https://api.ipregistry.co/?key=${process.env.REACT_APP_LOC_KEY}`)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (json) {
//  dispatch(setloc( json["location"]["city"]))
//     }).catch(function (err){
//       console.log(err);
//     })
   
//   },[])
  
  const toggle = () => {
    dispatch(toogleSideBar());
  };
  const { filtertext,cities,location,loctitle,defaultforloc,jobs } = messages[lang].Jobs;
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
          <h2 className="text-center">Filters</h2>
          <h3 className={styles.loctitle}>{jobs}</h3>
          {/* <div
            className={
              props.show
                ? `col-2 text-center ${styles.filterLogo}`
                : `col-3 text-center  col-md-4 ${styles.filterLogo}`
            }
          >
            <div className={`${styles.logoContainer} `}>
              <img
                src="https://elasticbeanstalk-us-east-2-780758728594.s3.us-east-2.amazonaws.com/majors/Electricity.png"
                className="img-fluid"
                alt=""
              />
            </div>
            <span>نجار</span>
          </div> */}
          {lang=="en"&&logos.map((logo,index)=>(
 <div
 className={
   props.show
     ? `col-2 text-center ${styles.filterLogo} ${filterForStyle==""?"":filterForStyle==logo.job?"":styles.notactivelogo}`
     : `col-3 text-center   col-md-4 ${styles.filterLogo} ${filterForStyle==""?"":filterForStyle==logo.job?"":styles.notactivelogo}`
 }
 key={index}
>
 <div className={`${styles.logoContainer} ${!props.show?"d-flex flex-column justify-content-center align-items-center":""} `}>
   <img
     src={logo.logoSrc}
     className="img-fluid"
     alt=""
     onClick={()=>{dispatchFilter(logo.job)}}
   />
    <span className="pt-1">{logo.job}</span>
 </div>
</div>

          ))}
           {lang=="ar"&&logosar.map((logo,index)=>(
 <div
 className={
   props.show
     ? `col-2 text-center ${styles.filterLogo} ${filterForStyle==""?"":filterForStyle==logo.job?"":styles.notactivelogo}`
     : `col-3 text-center   col-md-4 ${styles.filterLogo} ${filterForStyle==""?"":filterForStyle==logo.job?"":styles.notactivelogo}`
 }
 key={index}
>
 <div className={`${styles.logoContainer} `}>
   <img
     src={logo.logoSrc}
     className="img-fluid"
     alt=""
   />
 </div>
 <span>{logo.job}</span>
</div>

          ))}
          <div className="">
<h3 className={styles.loctitle}>{loctitle}</h3>
<div className="pt-1">
<label htmlFor="location" className="me-1">{location}</label>
      <select name="location" id="location" className={styles.sortInput}  onChange={getselectValue}>
        {/* <option defaultValue={selected==""} value="none" disabled hidden>pick a city</option> */}
      <option value="none" selected={selected==""} disabled hidden>{defaultforloc}</option>
    {cities.map((city,index)=>(
              <option key={index}  value={city}>{city}</option>

    ))}
      </select>
</div>

        </div>
        </div>
      
      </div>
    </>
  );
};

export default Filters;
