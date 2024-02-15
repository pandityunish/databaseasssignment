import React, { useState } from 'react'
import Navabar from '../Components/Navabar'
import { useEffect } from 'react';
import { addspecialist, getallspecialissts } from './Services/problemservice';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
export default function SepcialistsPage() {
  const [name, setname] = useState("");

    const [allspecalist, setallspecalist] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
    getallspecialissts({setspecialist:setallspecalist})
    }, [])
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <div className=''>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>All Specialist</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <input type="text" placeholder='Specialist Name' className='h-10 mt-10 w-60 px-5 border bg-gray-300 rounded-lg' onChange={(e)=>setname(e.target.value)}/>
        
      
          </DialogContentText>
        </DialogContent>
        <DialogActions>
    
          <Button onClick={()=>{
            addspecialist({toast:toast,specialist_name:name})
            // handleClose()
          }} color="error">Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
<Navabar/>
{allspecalist===null?<></>:<>
<div className='px-20 py-10'>
      <div className='flex justify-between '>
        <h1 className='font-bold text-2xl'>Specialist</h1>
        <button className='bg-green-600 rounded-2xl p-1 px-4 text-white' onClick={()=>{
        handleClickOpen()
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
    {e.currentlyworkingon==="working"?<>
      <div className='flex flex-col items-center'>
      <button className='bg-blue-600 rounded-lg  p-1 px-4 text-white' onClick={()=>{
      
       
      }}>
       Working
      </button>
      
    </div>
    </>:<div className='flex flex-col items-center'>
      <button className='bg-blue-600 rounded-lg  p-1 px-4 text-white'>
     Not working
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
