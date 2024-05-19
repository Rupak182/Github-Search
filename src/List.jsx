import React, { useEffect,useState } from 'react'

const List = ({d,name,i}) => {

    let [ddd,setDdd]=useState();
    let date =new Date();

    let cdate= {'day':date.getDate(), 'month':date.getMonth()+1,'year':1900+date.getYear()};


    let findDays = (udate)=>{
        let days =0;
        days+=cdate.day-udate.day
        days+=(cdate.month-udate.month)*30;
        days+=(cdate.year-udate.year)*12*30;
    
        return days;
      }
    
    
    
      let createDate=(date)=>{
    
        let d=date.split("T")[0].split("-");
        let res = {day:d[2],month:d[1],year:d[0]}
    
        return res;
      }
    
    
    
    
    
    let showDate= (date)=>{
          // console.log("a date" +date)
          let dates=createDate(date);
          let res=findDays(dates);
          console.log(res)
          setDdd(parseInt(res));
      }
    
      useEffect(()=>{
        showDate(d.updated_at);
      },[d])
      
      


  return (
    <a href={`https://github.com/${name}/${d.full_name}`} target='_blank' rel='noopener noreferrer'>
    <div className={`box${i+1} flex flex-col gap-2 text-white p-5 ${i%2!=0?'bg-[#19193b]': 'bg-[#1D1B48]'} rounded-lg`}>
    <span>{d.name}</span>
      <span>{d.description}</span>
      <div className="logos flex gap-2">
        {d.license && <span className='flex gap-2'><img src="Chield_alt.svg" alt="" /><span>{d.license.spdx_id}</span></span>}
        <span className='flex gap-2'><img src="Nesting.svg" alt="" /><span>{d.forks_count}</span></span>
        <span className='flex gap-2'><img src="Star.svg" alt="" /><span>{d.stargazers_count}</span></span>
        <span>updated {ddd} days ago</span>
      </div> 
    </div>
    </a>
  )
}

export default List
