import React, { useState } from 'react'
import Navabar from '../Components/Navabar'
import { useEffect } from 'react';
import { getspecialistproblem } from './Services/problemservice';
import { useLocation } from 'react-router-dom';
import { TimeAgo } from '../Components/Timeago';
import { useNavigate } from 'react-router-dom';
export default function SpecialistDetails() {
    const navigate=useNavigate()
const state=useLocation();
    const [specialistproblem, setspecialistproblem] = useState(null);
    useEffect(() => {
     getspecialistproblem({setspecialist:setspecialistproblem,id:state.state.id})
    }, [])
    
  return (
    <div>
        <Navabar/>
        <div className='px-20 py-10'>
        <div className='flex justify-between'>
   <div>
   <p className='font-bold text-3xl '>{state.state.name}</p>
    <p className='text-lg font-thin mt-3'>{state.state.name} is currently working on problems:</p>
   </div>
   <div className=''>
   
   <button className='bg-green-600 rounded-2xl p-1 px-4 text-white' onClick={()=>{

}}>
    Working
  </button>
 
   </div>
    </div>
    <div>

    </div>
    {specialistproblem===null?<></>:<>
    {specialistproblem.map((e,i)=>{
      return  <div key={i} className='p-3 bg-gray-300 rounded-lg flex items-center justify-between w-[70%] mt-5' onClick={()=>{
        if(e.status===null){

        }else{
          navigate("/problem-details",{state:{
            id:e.problem_number
          }})
        }
      }}>
      <h1 className='font-bold'>{i+1}. {e.notes}</h1>
      <div className='flex gap-3'>
    {e.status===null?<>
      <div className='flex flex-col items-center'>
      <button className='bg-blue-600 rounded-lg  p-1 px-4 text-white' onClick={()=>{
        handleClickOpen();
        setsetid(e.problem_number);
      }}>
      Assign
      </button>
      
    </div>
    </>:<div className='flex flex-col items-center'>
      <button className='bg-blue-600 rounded-lg  p-1 px-4 text-white'>
      Working
      </button>
      
    </div>}
    <button className='bg-red-600 rounded-lg p-1 h-8 px-4 text-white'>
      Delete
      </button>
      </div>
      <TimeAgo timestamp={e.created_at} />
    </div>
     })}
    </>}
    
        </div>
      
    </div>
  )
}
