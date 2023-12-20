import { useRef, useState } from "react"
import Header from "./Header"
import { validateData, validateName } from "../utils/validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_PROFILE_ICON } from "../utils/constants";
import { NETFLIX_BG } from "../utils/constants";


const Login = () => {
  const[isSignIn,setIsSignIn]=useState(true);
  const [errorMessage,setErrorMessage]=useState(null);
  const [nameError,setNameError]=useState(null);
  const dispatch=useDispatch();


  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(null);




  const changeForm=()=>{
    setIsSignIn(!isSignIn);
  }
  const handleButtonClick=()=>{
    //valid form data
    const msg=!isSignIn ? validateName(name.current.value) :null;
    setNameError(msg);
    const message=validateData(email.current.value,password.current.value);
    setErrorMessage(message);
    if(message || msg) return;
    
    if(!isSignIn){
      //Sign Up Login
      createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: USER_PROFILE_ICON
          }).then(() => {
            const {uid,email,displayName,photoURL} = auth.currentUser;
            dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
            
          }).catch((error) => {

            setErrorMessage(error.message)
          });
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+"-"+errorMessage);
        });

    }else{
      //Sign In Login
      signInWithEmailAndPassword(auth, email.current.value,password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+"-"+errorMessage);
        });


    }
  }
  return (
    <div>
      <Header/>
      <img className="absolute" src={NETFLIX_BG} alt="bg"/>

      <form onSubmit={(e)=>e.preventDefault()} className="w-3/12 absolute bg-black p-8 mx-auto my-36 right-0 left-0 flex flex-col bg-opacity-80 text-white">
        <h1 className="font-bold text-3xl text-white m-4">{isSignIn?"Sign In":"Sign Up"}</h1>
        {!isSignIn && <input type="text" ref={name} placeholder="Full Name" className="p-4 m-4 rounded-md bg-gray-600"/>}
        <input type="text" ref={email} placeholder="Email Address" className="p-4 m-4 rounded-md bg-gray-600"/>
        <input type="password" ref={password} placeholder="Password" className="p-4 m-4 rounded-md bg-gray-600"/>

        {!isSignIn && <p className="text-red-500 mx-4 font-bold p-2">{nameError}</p>}
        {nameError==null && <p className="text-red-500 mx-4 font-bold p-2">{errorMessage}</p>}
        <button 
          className="bg-[#e50914] text-white p-4 m-4 rounded-md font-medium"
          onClick={handleButtonClick}>
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
