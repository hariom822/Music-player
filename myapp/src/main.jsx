import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);













// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { signupUser, addLocalData } from '../redux/signupSlice';
// import { Link } from 'react-router-dom';

// function Signup() {
//   const dispatch = useDispatch();

//   const [signup, setSignup] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const [error, setError] = useState({});

//   const { loading, success } = useSelector((state) => state.signup);

//   const datasubmit = (e) => {
//     e.preventDefault();

//     const arr = {};

//     // Validation
//     if (!signup.name) arr.name = "Name is required";
//     if (!signup.email) arr.email = "Email is required";
//     if (!signup.phone) arr.phone = "Phone is required";
//     if (!signup.password) arr.password = "Password is required";

//     setError(arr);

//     if (Object.keys(arr).length > 0) return;

//     // Store locally (Redux)
//     dispatch(addLocalData(signup));

//     // API call using Redux thunk
//     dispatch(signupUser(signup));

//     alert("Data Submitted Successfully");

//     // Reset form
//     setSignup({
//       name: "",
//       email: "",
//       phone: "",
//       password: "",
//     });
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={datasubmit}
//         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
//           Sign Up
//         </h2>

//         {/* Name */}
//         <label className="block text-gray-600 font-medium mb-1">Name:</label>
//         <input
//           type="text"
//           className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           value={signup.name}
//           onChange={(e) => setSignup({ ...signup, name: e.target.value })}
//         />
//         {error.name && <p className="text-red-500 text-sm mb-2">{error.name}</p>}

//         {/* Email */}
//         <label className="block text-gray-600 font-medium mb-1">Email:</label>
//         <input
//           type="email"
//           className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           value={signup.email}
//           onChange={(e) => setSignup({ ...signup, email: e.target.value })}
//         />
//         {error.email && (
//           <p className="text-red-500 text-sm mb-2">{error.email}</p>
//         )}

//         {/* Phone */}
//         <label className="block text-gray-600 font-medium mb-1">Phone:</label>
//         <input
//           type="text"
//           className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           value={signup.phone}
//           onChange={(e) => setSignup({ ...signup, phone: e.target.value })}
//         />
//         {error.phone && (
//           <p className="text-red-500 text-sm mb-2">{error.phone}</p>
//         )}

//         {/* Password */}
//         <label className="block text-gray-600 font-medium mb-1">Password:</label>
//         <input
//           type="password"
//           className="w-full border border-gray-300 rounded-md p-2 mb-4"
//           value={signup.password}
//           onChange={(e) => setSignup({ ...signup, password: e.target.value })}
//         />
//         {error.password && (
//           <p className="text-red-500 text-sm mb-4">{error.password}</p>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors font-semibold"
//         >
//           {loading ? "Submitting..." : "Submit"}
//         </button>

//         <Link to="/login" className="font-bold underline pl-40">
//           Login
//         </Link>
//       </form>
//     </div>
//   );
// }

// export default Signup;
