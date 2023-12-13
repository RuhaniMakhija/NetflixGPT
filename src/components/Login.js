import { useState } from "react"
import Header from "./Header"


const Login = () => {
  const[isSignIn,setIsSignIn]=useState(true);
  const changeForm=()=>{
    setIsSignIn(!isSignIn);
  }
  return (
    <div>
      <Header/>
      <img className="absolute" src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="bg"/>

      <form className="w-3/12 absolute bg-black p-8 mx-auto my-36 right-0 left-0 flex flex-col bg-opacity-80 text-white">
        <h1 className="font-bold text-3xl text-white m-4">{isSignIn?"Sign In":"Sign Up"}</h1>
        {!isSignIn && <input type="text" placeholder="Full Name" className="p-4 m-4 rounded-md bg-gray-600"/>}
        <input type="email" placeholder="Email Address" className="p-4 m-4 rounded-md bg-gray-600"/>
        <input type="password" placeholder="Password" className="p-4 m-4 rounded-md bg-gray-600"/>
        <button 
          className="bg-[#e50914] text-white p-4 m-4 rounded-md font-medium">
          {isSignIn?"Sign In":"Sign Up"}
        </button>
        <p className="m-4 cursor-pointer"
          onClick={changeForm}>
          {isSignIn? "New to Netflix? Sign Up Now":"Already Registered? Sign In Now"}
          
        </p>
      </form>
    </div>
  )
}

export default Login
