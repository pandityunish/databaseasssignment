import React, { useEffect, useState } from 'react'
import Navabar from '../Components/Navabar'
import { useNavigate } from 'react-router-dom'
import { assignproblemtospecialist, deleteproblems, getallproblems, getallspecialissts } from './Services/problemservice';
import { TimeAgo } from '../Components/Timeago';
import { Button, Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';

export default function Home() {
    const navigate=useNavigate();
    const [allspecalist, setallspecalist] = useState([]);
    const [setid, setsetid] = useState("")
    // const userAgent = navigator.userAgent;
// console.log(userAgent);
const userAgent = window.navigator.userAgent;
const platform = window.navigator.platform;
const [open, setOpen] = useState(false);
const randomString = Math.random().toString(20).substring(2, 14) + Math.random().toString(20).substring(2, 14);

const deviceID = `${userAgent}-${platform}-${randomString}`;
const windowsVersionMatch = deviceID.match(/Windows NT (\d+\.\d+)/);
const windowsVersion = windowsVersionMatch ? windowsVersionMatch[1] : "Unknown";

// Extract the last number after "win-32"
const lastNumberMatch = userAgent.match(/win-32-(\d+)/);
const lastNumber = lastNumberMatch ? lastNumberMatch[1] : "Unknown";



const [problems, setproblems] = useState([]);
useEffect(() => {
getallproblems({setproblem:setproblems});
getallspecialissts({setspecialist:setallspecalist});
}, [])
const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
  return (
    <div>
       <Dialog open={open} onClose={handleClose}>
        <DialogTitle>All Specialist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {allspecalist.map((e,i)=>{
              return  <div key={i} className='flex gap-3 py-2 items-center'>
              <p>{e.specialist_name}</p>
              {e.currentlyworkingon==="working"?<button className='bg-blue-600 rounded-lg  p-1 px-4 text-white'>
      Working
      </button>: <button className='bg-blue-600 rounded-lg  p-1 px-4 text-white' onClick={()=>{
                assignproblemtospecialist({toast:toast,id:e.specialist_id,problem_id:setid})
              }}>
           Assign
           </button>} 
               
              </div>
            })}
        
      
          </DialogContentText>
        </DialogContent>
        <DialogActions>
    
          <Button onClick={()=>{
            handleClose()
          }} color="error">Ok</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Navabar/>
      <div className='px-20 py-10'>
      <div className='flex justify-between '>
        <h1 className='font-bold text-2xl'>Problems</h1>
        <button className='bg-green-600 rounded-2xl p-1 px-4 text-white' onClick={()=>{
          navigate("/addproblem")
        }}>
          Add Problem
        </button>
       
      </div>
     {problems.map((e,i)=>{
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
      {e.status==="solved"?"Solved": "Working"}
      </button>
      
    </div>}
    <button className='bg-red-600 rounded-lg p-1 h-8 px-4 text-white' onClick={()=>{
      deleteproblems({toast:toast,id:e.problem_number})
    }}>
      Delete
      </button>
      </div>
      <TimeAgo timestamp={e.created_at} />
    </div>
     })}
     
      </div>
    </div>
  )
}
