import React, { useEffect, useState } from 'react'
import Navabar from '../Components/Navabar'
import { Button, Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addproblemtypes } from './Services/auth';
import { toast } from 'react-toastify';
import { addproblem, getallproblemstype } from './Services/problemservice';
export default function AddProblem() {
    const [name, setname] = useState("");
    const [desc, setdesc] = useState("");
    const [notes, setnotes] = useState("");
    const [newproblemtype, setnewproblemtype] = useState("");
    const [problemid, setproblemid] = useState("")
    const [open, setOpen] = useState(false);
const [getallproblemtypes, setgetallproblemtypes] = useState([])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
const addnewproblemtype=()=>{
  addproblemtypes({name:newproblemtype,toast:toast});
  setOpen(false);
}
const addnewproblem=()=>{
  const personnel_id=localStorage.getItem("personnel_id");
  const username=localStorage.getItem("username");
  console.log(personnel_id)
  addproblem({toast:toast,equipment_type:"Laptop",software_name:"Chrome",description:desc,notes:notes,personnel_id:personnel_id,caller_name:name,helpdeskoperatorname:username,problem_id:problemid})
}
useEffect(() => {
 getallproblemstype({setproblemtypes:setgetallproblemtypes});
}, [])

  return (
    <div >
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Problem Type</DialogTitle>
        <DialogContent>
          <DialogContentText>
           <input type="text" placeholder='Problem Type' className='h-10 mt-4 w-60 px-5 border bg-gray-300 rounded-lg' onChange={(e)=>setnewproblemtype(e.target.value)}/>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* Button to close the dialog */}
          <Button onClick={()=>{
addnewproblemtype();
          }} color="error">Ok</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
<Navabar/>
<div className='px-20 py-10'>
<div className='flex justify-between '>
        <h1 className='font-bold text-2xl'>Add Problem</h1>
        <button className='bg-green-600 rounded-2xl p-1 px-4 text-white' onClick={()=>{
     addnewproblem();
      }}>
          Save
        </button>
       
      </div>
    <div className='flex flex-col'>
    <input type="text" placeholder='Caller Name' className='h-10 mt-10 w-60 px-5 border bg-gray-300 rounded-lg' onChange={(e)=>setname(e.target.value)}/>
     <textarea rows="4" cols="50" type="text" placeholder='Description' className=' mt-4  pt-4 w-60 px-5 border bg-gray-300 rounded-lg' onChange={(e)=>setdesc(e.target.value)}/>
     <input type="text" placeholder='Notes' className='h-10 mt-4 w-60 px-5 border bg-gray-300 rounded-lg' onChange={(e)=>setnotes(e.target.value)}/>
     <select name="" id="" className='w-60 h-10 border border-gray-200 bg-gray-300 rounded-lg mt-4 px-4' onChange={(value)=>{
      setproblemid(value.target.value)
if(value.target.value==="addproblem"){
  handleClickOpen()
}
     }}>
      <option value="">Select Problem type</option>
      {getallproblemtypes.map((e,i)=>{
              return  <option value={e.problem_id} key={i}>{e.problem_type_name}</option>

      })}
      <option value="addproblem">Add Problem Type</option>
     </select>
    </div>
</div>
    </div>
  )
}
