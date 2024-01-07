import React from 'react'
import { useState } from 'react';
import login from '../assets/login.jpg';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Link } from 'react-router-dom';
import { loginuser } from './Services/auth';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
export default function Login() {
    const [showPassword, setshowPassword] = useState("Hide")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("");
    const [isStudent, setisStudent] = useState(true);
    const togglePasswordVisibility = () => {
        setshowPassword(!showPassword);
      }
      const loginusers=()=>{
        if(email===""|| password===""){
          toast.error("Please enter all values")
        }else{
          loginuser({username:email,password:password,toast:toast})
        }
      }
  return (
    <div className='flex items-center justify-between'>
        <div className=' h-[40%] w-[50%] lg:block hidden'>
            <img src={login} alt="" className='h-[40%] w-[90%]'/>
        </div>
    <div className='pb-7 lg:w-[35%] lg:m-0 m-3  w-[100%]  flex flex-col lg:items-start items-center'>
     <h1 className='mt-7 text-4xl font-bold font-sans text-start'>Login</h1>
     <p className='text-center font-normal mt-3 text-sm'>Welcome Back,You have been missed</p>
     
     <p className='font-semibold text-sm mt-3 mb-1 lg:w-[70%] w-[90%] text-start '>User Name</p>
     <input type="text" className='lg:w-[70%] w-[90%] border h-8 text-xs rounded-md pl-3  outline-none' id='email' name='email' placeholder='Username' onChange={(e)=>setemail(e.target.value)}/>
     <p className='font-semibold text-sm mt-2 lg:w-[70%] w-[90%] text-start'>Password</p>
     <div className='relative flex items-center lg:w-[70%] w-[90%] '>
       <p className='absolute z-10 right-3 top-1 cursor-pointer text-gray-400'
        onClick={togglePasswordVisibility}>{showPassword? <VisibilityOutlinedIcon fontSize='small'/>:<VisibilityOffOutlinedIcon fontSize='small'/>}</p>
     <input type={showPassword?"password": "text"} className='w-[100%] border  h-8 text-xs rounded-md pl-3  outline-none' placeholder='Password' id='password' name='password' onChange={(e)=>setpassword(e.target.value)}/>

    
     </div>
     <button className='lg:w-[70%] w-[90%] bg-purple-700 h-10 shadow-xl rounded-md text-white mt-3' onClick={(e)=>{
       loginusers();
     }}>
       Login
     </button>
     <p className='text-center text-sm w-[70%] mt-2 cursor-pointer'>Forgot Password?</p>

     <div className='flex flex-row w-[70%] items-center mt-2 justify-between'>
        <div className='h-[1px] w-[45%] bg-gray-200'>

        </div>
        <p>or</p>
        <div className='h-[1px] w-[45%] bg-gray-200'>

        </div>
     </div>

         <p className='mt-4 text-base text-center w-[70%]'>Don't have an account? 
         <Link to="/register">
             <span className='font-bold cursor-pointer underline text-blue-700'>Register</span>
             </Link>
             </p>
   
    </div>
 </div>
  )
}
