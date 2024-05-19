import React from 'react'
import List from './List'

const Data = ({data,name}) => {
  return (
    <>
       {data.map((d,i)=>{
                return(
                    <List d={d} name={name} i={i}/>
                )
              })
            }
    </>
  )
}

export default Data
