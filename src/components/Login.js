import { useRef, useState } from "react"
import Header from "./Header"
import { validateData, validateName } from "../utils/validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const Login = () => {
  const[isSignIn,setIsSignIn]=useState(true);
  const [errorMessage,setErrorMessage]=useState(null);
  const [nameError,setNameError]=useState(null);
  const navigate=useNavigate();
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
            displayName: name.current.value, photoURL: "https://media.licdn.com/dms/image/D4D03AQGEPiTc0uEb1A/profile-displayphoto-shrink_800_800/0/1699092873319?e=1708560000&v=beta&t=OUyT3Plm4XnvOtli920XXFA69Kb6g_7uxAw207bmQjY"
          }).then(() => {
            const {uid,email,displayName,photoURL} = auth.currentUser;
            dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
            navigate("/browse");
          }).catch((error) => {

            setErrorMessage(error.message)
          });
          console.log(user);
          
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
          console.log(user);
          navigate("/browse");
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
      <img className="absolute" src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="bg"/>

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
