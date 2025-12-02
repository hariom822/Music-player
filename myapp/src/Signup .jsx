import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
  })
  const [error, setError] = useState({})
  const navigate = useNavigate()

  const datasubmit = (e) => {
    e.preventDefault()
    const arr = {}

    if (!data.name) arr.name = "Please enter name"
    if (!data.email) arr.email = "Please enter email"
    if (!data.phone) arr.phone = "Please enter phone"
    if (!data.dob) arr.dob = "Please enter date of birth"
    if (!data.password) arr.password = "Please enter password"

    setError(arr)

    if (Object.keys(arr).length === 0) {
      localStorage.setItem("user", JSON.stringify(data))
      alert("Data submitted successfully")
      setData({
        name: '',
        email: '',
        phone: '',
        dob: '',
        password: '',
      })
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 transform transition duration-300 hover:scale-[1.02]">
        <form onSubmit={datasubmit} autoComplete="off">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
            Create an Account
          </h2>
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold">User Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className={`px-4 py-3 rounded-xl border transition focus:ring-2 focus:ring-blue-400 outline-none 
                ${error.name ? "border-red-500" : "border-gray-400"}`}
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            {error.name && <span className="text-red-500 text-sm mt-1">{error.name}</span>}
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`px-4 py-3 rounded-xl border transition focus:ring-2 focus:ring-blue-400 outline-none 
                ${error.email ? "border-red-500" : "border-gray-400"}`}
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            {error.email && <span className="text-red-500 text-sm mt-1">{error.email}</span>}
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold">Phone Number</label>
            <input
              type="text"
              placeholder="Enter your phone"
              className={`px-4 py-3 rounded-xl border transition focus:ring-2 focus:ring-blue-400 outline-none 
                ${error.phone ? "border-red-500" : "border-gray-400"}`}
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
            {error.phone && <span className="text-red-500 text-sm mt-1">{error.phone}</span>}
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold">Date of Birth</label>
            <input
              type="date"
              className={`px-4 py-3 rounded-xl border transition focus:ring-2 focus:ring-blue-400 outline-none 
                ${error.dob ? "border-red-500" : "border-gray-400"}`}
              value={data.dob}
              onChange={(e) => setData({ ...data, dob: e.target.value })}
            />
            {error.dob && <span className="text-red-500 text-sm mt-1">{error.dob}</span>}
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-1 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className={`px-4 py-3 rounded-xl border transition focus:ring-2 focus:ring-blue-400 outline-none 
                ${error.password ? "border-red-500" : "border-gray-400"}`}
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            {error.password && <span className="text-red-500 text-sm mt-1">{error.password}</span>}
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl mt-2 
            font-semibold hover:bg-blue-800 transition-all active:scale-95 shadow-md">
            Signup
          </button>
        </form>

        <Link to={'/login'}>
          <p className="text-center mt-4 font-semibold text-blue-700 hover:underline hover:text-blue-900 transition">
            Already have an account? Login
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Signup
