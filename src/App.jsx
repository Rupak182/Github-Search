import { useEffect, useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Data2 from './Data2'
import Data from './Data'

function App() {


  let [data,setData]=useState([]);
  let [name,setName]=useState("");
  let [nextUser,setNextUser]=useState([]);
  let [visible,setVisible]=useState(false);






  useEffect(()=>{
    fetch("https://api.github.com/users/github/repos").then((res)=>res.json()).then((d)=>setData(d))

  },[]);

  let [user,setUser]= useState({});

  useEffect(()=>{
    fetch("https://api.github.com/users/github").then((res)=>res.json()).then((data)=>setUser(data));
  },[])

  let handleChange= (e)=>{

    setName(e.target.value);
    console.log(e.target.value);

      
  }

  useEffect(()=>{

    let getData =()=>{
      fetch(`https://api.github.com/users/${name}`).then((res)=>res.json()).then((data)=>setNextUser(data));
    }
    
    let timer =setTimeout(()=>{
      if(name)
        getData()
    },100);

    return ()=>clearTimeout(timer);


  },[name])


  let handleClick= (()=>{
    inputRef.current.innerText="";

    let getData =()=>{
      fetch(`https://api.github.com/users/${name}`).then((res)=>res.json()).then((data)=>setUser(data));
      fetch(`https://api.github.com/users/${name}/repos`).then((res)=>res.json()).then((d)=>setData(d));
      setName("");
    }

    getData();

  })




  const inputRef= useRef(null);


  return (
    <>

      <div className="contain bg-[#20293A] w-full min-h-[100vh] font-Be ">
        <div className="top relative flex  justify-center bg-[url(hero-image-github-profile.png)]  h-[40vh] w-full ">
          <img className src=" " alt="" srcset="" />
          <div className="searchbox lg:w-1/3 w-[80vh]  relative">
            <label className='absolute left-1 top-[50px]' htmlFor="search"><img src="Search.svg " alt="" srcset="" /></label>
            <input value={name} onChange={handleChange} className='bg-[#20293A] p-3 px-10 mt-10 w-full text-white rounded-lg' type="text   " placeholder='username'  />

            {name && <div onClick={handleClick}  ref={inputRef} className={`search bg-[#111629] p-5 mt-2 flex  rounded-lg cursor-pointer`}>
            <span><img src={`https://avatars.githubusercontent.com/u/${nextUser.id}?v=4`} className='w-[50px]' alt="" srcset="" /></span>
              <div><div className="name text-white">{nextUser.name}</div> <div className="bio text-[#CDD5E0]">{nextUser.bio}</div></div>
            </div>
          }
          </div>
        </div>
        <div className="body flex gap-2 items-center  w-[80%] m-auto">
          <div className="logo relative bottom-20 bg-[#20293A] p-3 w-fit  rounded-lg ">
            <img src= {`https://avatars.githubusercontent.com/u/${user.id}?v=4`} className='rounded-lg  w-[150px] h-[150px]' alt="" srcset="" />
          </div>
          <div className="others flex flex-col lg:flex-row self-baseline lg:gap-7 gap-1  ">
            <button className='bg-[#111629]  rounded-xl  px-4 py-5 mt-5 gap-2'><span className="text-[#4A5567]">Followers | <span className='text-white' >{user.followers}</span></span></button>
            <button className='bg-[#111629]  rounded-xl  px-4 py-5 mt-5 gap-2'><span className="text-[#4A5567]">Following | <span className='text-white' >{user.following}</span></span></button>
            <button className='bg-[#111629]  rounded-xl  px-4 py-5 mt-5 gap-2'><span className="text-[#4A5567]">Location | <span className='text-white' >{user.location}</span></span></button>
          </div>
        </div>

        <div className="body2  text-white w-[80%] m-auto ">
          <div className="header flex flex-col gap-2 ">
            <h1 className='text-4xl'>{user.name}</h1>
            <span className=''>{user.bio}</span>
          </div>
        </div>

        <div className="boxes w-[80%] m-auto grid lg:grid-cols-2 gap-4 mt-10 grid-cols-1 ">
          {
              !visible? <Data2 data={data} name={name}/>:<Data data={data} name={name}/>
              


          }

          {!visible && <div className="footer w-[80vw] flex items-center justify-center text-[#CDD5E0] mt-2">
            <button onClick={()=>setVisible(true)}>View all repositories</button>
          </div>
          }


        </div>

      </div>

    </>
  )
}

export default App
