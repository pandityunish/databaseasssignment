import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
export default function Navabar() {
 
  return (
    <div className='px-10 py-7 bg-blue-700 flex justify-between text-white'>
      <p>Logo</p>
      <div className='flex gap-3'>
        <Link to="/home" className='cursor-pointer'>Home</Link>
        <Link to="/specialist-page" className='cursor-pointer'>Specialist</Link>
        <Link to="/" className='cursor-pointer'>Profile</Link>
        <Link to="/search" className='cursor-pointer'>
        <SearchIcon/>
        </Link>
      </div>
    </div>
  )
}
