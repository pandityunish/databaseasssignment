import React, { useEffect, useState } from 'react'
import Navabar from '../Components/Navabar'
import { getproblemdetails, updatesolution } from './Services/problemservice';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { Button, Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function Detailpage() {
    const state=useLocation();
    const [problemdetails, setproblemdetails] = useState(null);
    useEffect(() => {
     getproblemdetails({toast:toast,id:state.state.id,setproblemdetails:setproblemdetails})
    }, [])
    const [open, setOpen] = useState(false);
    const [name, setname] = useState("")
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formatDate = (dateString) => {
    const givenTime = new Date(dateString);
  
    // Format the date
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',  };
    const formattedTime = givenTime.toLocaleDateString('en-US', options);
  
    return formattedTime;
  };
  return (
    <div>  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Solution</DialogTitle>
    <DialogContent>
      <DialogContentText>
       <textarea type="text" rows="4" cols="50" placeholder='Solution Details' className='mt-1 pt-4 w-60 px-2 border bg-gray-300 rounded-lg' onChange={(e)=>setname(e.target.value)}/>

      </DialogContentText>
    </DialogContent>
    <DialogActions>
      {/* Button to close the dialog */}
      <Button onClick={()=>{
        updatesolution({toast:toast,id:state.state.id,resolution_details:name,time:problemdetails[0].created_at,specialist_id:problemdetails[0].specialist_id})
      }} color="error">Ok</Button>
      <Button onClick={handleClose}>Cancel</Button>
    </DialogActions>
  </Dialog>
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
  {problemdetails[0].status==="solved"?<></>:   <button className='bg-green-600 rounded-2xl p-1 px-4 text-white' onClick={()=>{
handleClickOpen()
}}>
    Marked as solve
  </button>}

 
   </div>
    </div>
    <p className='font-bold text-lg mt-10'>Description: <span className='font-thin '>{problemdetails[0].description}</span></p>
    <p className='font-bold text-lg mt-3'>Notes: <span className='font-thin '>{problemdetails[0].notes}</span></p>

    {problemdetails[0].resolution_details===null?<></>:<>
    <p className='font-bold text-lg mt-7'>If finished</p>
    <p className='font-bold text-lg mt-3'>Resolution Details: <span className='font-thin '>{problemdetails[0].resolution_details}</span></p>
    <p className='font-bold text-lg mt-3'>Resolution Date: <span className='font-thin '>{formatDate(problemdetails[0].resolved_date)}</span></p>
    <p className='font-bold text-lg mt-3'>Time Taken: <span className='font-thin '>{problemdetails[0].time_taken}</span></p>
    </>}
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
