import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector(store=>store.user);
  const handleSignOut=()=>{
          
      signOut(auth).then(() => {
      }).catch((error) => {
      });
  }

  const handleGPTSearch=()=>{
    dispatch(toggleGptSearchView());
  }

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });
    return ()=>unsubscribe();
  },[])
  const handleLanguageChange=(e)=>{
    dispatch(changeLanguage(e.target.value));
  }
  const checkGTPSearchPage=useSelector(store=>store.gpt.showGptSearch)
  return (
    <div className="absolute z-10 w-screen bg-gradient-to-b from-black px-8 py-2 flex justify-between">
      <img 
      className="w-44"
      src={LOGO} alt="logo"/>
      {user &&  (
        <div className="flex p-2">
         {checkGTPSearchPage && <select className="bg-gray-800 text-white p-2 m-2" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map(lang=><option key={lang.name} value={lang.identifier}>{lang.name}</option>)}
          </select>}
          <button className="text-white px-4 py-2 bg-blue-500 rounded-lg mx-4 my-2"
            onClick={handleGPTSearch}>
            {checkGTPSearchPage ? "Home Page" : "GPT Search"}
          </button>
          <img 
            src={user?.photoURL}
            className="w-12 h-12" 
            alt="user-icon"
          />
          <button onClick={handleSignOut} className="font-bold text-white">Sign Out</button>
      </div>)}
    </div>
  )
}

export default Header
