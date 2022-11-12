import React from 'react'
import './TrendSection.css';
import { useSelector } from 'react-redux';
import messages from './../../../Locale/messages';
const TrendSection = () => {
    const TrendData= [
        {
          name: "Minions",
          shares: 97,
        },
        {
          name: "Avangers",
          shares: 80.5,
        },
        {
          name: "Zainkeepscode",
          shares: 75.5,
        },
        {
          name: "Reactjs",
          shares: 72,
        },
        {
          name: "Elon Musk",
          shares: 71.9,
        },
        {
          name: "Need for Speed",
          shares: 20,
        },
      ];
      
      const language = useSelector((s) => s.lang.lang);
      const {
        TrendsForYour
      } = messages[language].profile;

  return (
    <div className='TrendCard mt-5'>
       <h3>{TrendsForYour}</h3>
        {TrendData.map(trend =>{
            return(
                <div className="trend">
                    <span>#{trend.name}</span>
                    <span>{trend.shares} Shares</span>
                </div>
            )
        })}
    </div>
  )
}

export default TrendSection