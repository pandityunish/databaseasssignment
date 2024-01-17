import React, { useEffect, useState } from 'react'
import Navabar from '../Components/Navabar'
import { getproblemdetails } from './Services/problemservice';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
export default function Detailpage() {
    const state=useLocation();
    const [problemdetails, setproblemdetails] = useState(null);
    useEffect(() => {
     getproblemdetails({toast:toast,id:state.state.id,setproblemdetails:setproblemdetails})
    }, [])
    
  return (
    <div>
        <Navabar/>
        {problemdetails===null?<></>: <div className='px-20 py-10'>
  <div className='flex justify-between'>
   <div>
   <p className='font-bold text-3xl '>1.{problemdetails[0].notes}</p>
    <p className='text-lg font-thin mt-3'>{problemdetails[0].specialist_name} is currently working on</p>
   </div>
   <div className=''>
   <button className='bg-blue-600 rounded-2xl p-1 mx-2 px-4 text-white' >
    {problemdetails[0].status}
  </button>
   <button className='bg-green-600 rounded-2xl p-1 px-4 text-white' onClick={()=>{

}}>
    Marked as solve
  </button>
 
   </div>
    </div>
    <p className='font-bold text-lg mt-10'>Description: <span className='font-thin '>{problemdetails[0].description}</span></p>
    <p className='font-bold text-lg mt-3'>Notes: <span className='font-thin '>{problemdetails[0].notes}</span></p>

    {problemdetails[0].resolution_details===null?<></>:<>
    <p className='font-bold text-lg mt-7'>If finished</p>
    <p className='font-bold text-lg mt-3'>Resolution Details: <span className='font-thin '>{problemdetails[0].resolution_details}</span></p>
    <p className='font-bold text-lg mt-3'>Resolution Date: <span className='font-thin '>1 jan 2023 8:20 am</span></p></>}
        </div>}    
       <div className='flex justify-end px-20'>
       <button className='bg-red-600  rounded-2xl mt-32 p-1 px-4 text-white' onClick={()=>{

}}>
    Delete
  </button>
       </div>
    </div>
  )
}
