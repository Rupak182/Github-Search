import React from 'react'
import List from './List'
const Data2 = ({data,name}) => {
  return (
    <>
      {data.slice(0,4).map((d,i)=>{
                return(
                  <List d={d} name={name} i={i}/>
                )
              })
            }
  </>
      
  )
}

export default Data2
