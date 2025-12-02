import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [logindata, setLogindata] = useState({
    email: '',
    password: '',
  })

  const usenaviget = useNavigate()
  const [signupdata, setSignupdata] = useState([])
  const [errors, setErrors] = useState({})
  const logindatasubmit = (e) => {
    e.preventDefault()
    const arr = {}
    if (!logindata.email) {
      arr.email = "email is redured"
      
    }
    if (!logindata.password) {
      arr.password = "password is requrid"
      
    }
    setErrors(arr)
    
    if (Object.keys(arr).length === 0) {
     
    const result = JSON.parse(localStorage.getItem('user'))
    setSignupdata(result)
    if (!result) {
      alert("plese first signup")
      usenaviget('/signup')
    }else{
       sessionStorage.setItem("loginuser", JSON.stringify(logindata))
    }
    
      if ((logindata.email !== result.email)) {
        alert("plese enter a valid email")
        return;
      }
      if ((logindata.password !== result.password)) {
        alert("plese enter a vaild password")
        return;
      }
      alert("login successfully")
      usenaviget('/')
    }
  }
  console.log(signupdata)
  return (
    <div className="h-screen flex items-center justify-center  bg-blue-200 ">
      <div className="bg-white  rounded-xl w-120 h-100 p-8">
        <form onSubmit={logindatasubmit}>
          <h2 className="text-2xl font-bold text-center mb-6 ">Login Page</h2>
          <div className="flex flex-col mb-4">
            <label className="mb-2 ">Email Address</label>
            <input type="email" placeholder="Enter your email"
              className={`px-4 py-3  rounded-xl border-3 ${errors.email ? "border-red-500" : "border-black"}`}
              value={logindata.email} onChange={(e) => setLogindata({ ...logindata, email: e.target.value })} />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-3">Password</label>
            <input type="password" placeholder="Enter your password"
              className={`px-4 py-3  rounded-xl border-3 ${errors.password ? "border-red-500" : "border-black"}`}
              value={logindata.password} onChange={(e) => setLogindata({ ...logindata, password: e.target.value })} />
          </div>
          <button className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-700" type='submit'>
            Login
          </button>
          <Link to={'/signup'}><p className='flex font-bold hover:scale-103 justify-center mt-2 hover:underline'>Signup</p></Link>
        </form>
      </div>
    </div>

  )
}

export default Login
