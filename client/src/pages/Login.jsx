import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login, setUser } from '../../redux/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async(e) => {
    e.preventDefault();

    const res = await axios.post("https://homebites-5qw3.onrender.com/api/login", {
      email,
      password,
    }, {withCredentials: true});

    const data = await res.data;
    if(data.success) {
      toast.success(data.message);
      dispatch(login());
      dispatch(setUser(data.user));
      navigate('/');
    }
  }
  return (
<div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <form className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
            <div
              className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
            >
              Login
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                name="password"
                required
                autoComplete="false"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700" type="submit">Login</button>
            </div>
            <div className='text-sm flex gap-2 mt-2'>
              <span>Or</span>
              <Link to="/signup" className='text-blue-400 hover:underline'>Create an account</Link>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Login
