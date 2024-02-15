import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assignproblemtospecialist, getallspecialissts, searchqueryproblems } from './Services/problemservice';
import { TimeAgo } from '../Components/Timeago';
import { Button, Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
export default function Search() {
    const navigate=useNavigate();
    const [search, setsearch] = useState("");
    const [allspecalist, setallspecalist] = useState([]);
    const [setid, setsetid] = useState("")
    const [open, setOpen] = useState(false);
    const [searchproblems, setsearchproblems] = useState(null);
    useEffect(() => {
        getallspecialissts({setspecialist:setallspecalist});
        }, [])
        const handleClickOpen = () => {
          setOpen(true);
        };
        
        const handleClose = () => {
          setOpen(false);
        };
       const searchallproblems=(e)=>{
        searchqueryproblems({toast:toast,search:e,setproblems:setsearchproblems})
       }
  return (
    <div>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>All Specialist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {allspecalist.map((e,i)=>{
              return  <div key={i} className='flex gap-3 py-2 items-center'>
              <p>{e.specialist_name}</p>
              {e.currentlyworkingon===null? <button className='bg-blue-600 rounded-lg  p-1 px-4 text-white' onClick={()=>{
                assignproblemtospecialist({toast:toast,id:e.specialist_id,problem_id:setid})
              }}>
           Assign
           </button>:<button className='bg-blue-600 rounded-lg  p-1 px-4 text-white'>
      Working
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
        <div className='px-10 py-7 bg-blue-700 flex justify-between text-white'>
      <p>Logo</p>
      <div className='flex gap-3 items-center '>
        <Link to="/home" className='cursor-pointer'>Home</Link>
        <Link to="/specialist-page" className='cursor-pointer'>Specialist</Link>
        <Link to="/" className='cursor-pointer'>Profile</Link>
        <div className='cursor-pointer'>
        <input type="text" placeholder='Search Here' className='h-10  w-60 px-5 border bg-gray-300 rounded-lg text-black' onChange={(e)=>searchallproblems(e.target.value)}/>

        </div>



      </div>
    </div>
    <div>
{searchproblems===null?<></>:<div className='px-20 py-10'>
{searchproblems.map((e,i)=>{
    return <div key={i} className='p-3 bg-gray-300 rounded-lg flex items-center justify-between w-[70%] mt-5' onClick={()=>{
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
    <button className='bg-red-600 rounded-lg p-1 h-8 px-4 text-white'>
      Delete
      </button>
      </div>
      <TimeAgo timestamp={e.created_at} />
    </div>
})}
</div>}
    </div>
    </div>
  )
}
