import React, { useState } from 'react'
import Navabar from '../Components/Navabar'
import { useEffect } from 'react';
import { getallspecialissts } from './Services/problemservice';
import { useNavigate } from 'react-router-dom';
export default function SepcialistsPage() {
    const [allspecalist, setallspecalist] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
    getallspecialissts({setspecialist:setallspecalist})
    }, [])
    
  return (
    <div className=''>
<Navabar/>
{allspecalist===null?<></>:<>
<div className='px-20 py-10'>
      <div className='flex justify-between '>
        <h1 className='font-bold text-2xl'>Specialist</h1>
        <button className='bg-green-600 rounded-2xl p-1 px-4 text-white' onClick={()=>{
        //   navigate("/addproblem")
        }}>
          Add specialist
        </button>
       
      </div>
     {allspecalist.map((e,i)=>{
      return  <div key={i} className='p-3 bg-gray-300 rounded-lg flex items-center justify-between w-[70%] mt-5' onClick={()=>{
       if(e.currentlyworkingon==="working"){
navigate("/specialist-detail",{state:{
    id:e.specialist_id,
    name:e.specialist_name
}})
       }
      }}>
      <h1 className='font-bold'>{i+1}. {e.specialist_name}</h1>
      <div className='flex gap-3'>
    {e.currentlyworkingon===null?<>
      <div className='flex flex-col items-center'>
      <button className='bg-blue-600 rounded-lg  p-1 px-4 text-white' onClick={()=>{
        handleClickOpen();
       
      }}>
      Not working
      </button>
      
    </div>
    </>:<div className='flex flex-col items-center'>
      <button className='bg-blue-600 rounded-lg  p-1 px-4 text-white'>
      Working
      </button>
      
    </div>}
   
      </div>
    </div>
     })}
     
      </div>
</>}

    </div>
  )
}
