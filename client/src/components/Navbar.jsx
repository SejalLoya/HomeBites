import axios from 'axios';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {Link } from 'react-router-dom';
import { login, logout, setUser } from '../../redux/slices/authSlice';

const Navbar = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  const handleLogout = async() => {
    const res = await axios.get("https://homebites-5qw3.onrender.com/api/logout", {withCredentials: true});
    const data = await res.data;
    if(data.success) {
      toast.success(data.message);
      dispatch(logout());
    }
  }

  const checkUser = async() => {
    const res = await axios.get("https://homebites-5qw3.onrender.com/api/fetch-user", {withCredentials: true});
    const data = await res.data;
    if(data.success) {
      dispatch(login());
      dispatch(setUser(data.user));
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <nav className='flex justify-between bg-white px-3 mb-10 shadow-md lg:px-5 py-4 md:px-4'>
        <Link to ="/" className='text-xl font-bold'>HomeBites</Link>
        <div className='flex gap-3 text-md justify-center items-center text-gray-600'>
            <Link to="/about" className='hover:text-black hover:bg-gray-200 hover:rounded-md hover:px-1'>About</Link>
            {
              isAuth && (<Link to="/favourites" className='hover:text-black hover:bg-gray-200 hover:rounded-md hover:px-1'>Favourites</Link>)
            }
            {
              isAuth ? (<li to="/logout" onClick={handleLogout} className='hover:text-black hover:bg-gray-200 hover:rounded-md hover:px-1 list-none'>Logout</li>) : (<Link to="/login" className='hover:text-black hover:bg-gray-200 hover:rounded-md hover:px-1'>Login</Link>)
            }
        </div>
    </nav>
  )
}

export default Navbar
