import React from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {
    const langName=useSelector(store=>store.config.lang)
  return (
    <div className='pt-[10%] flex justify-center bg-'>
      <form className='w-1/2 bg-black grid grid-cols-12'>
        <input type='text'
             placeholder={lang[langName].searchPlaceholder}
             className='p-4 m-4 rounded-lg col-span-9'
        />
        <button 
            className='px-4 py-2 m-4 font-bold text-xl bg-red-700 text-white rounded-lg col-span-3'>
            {lang[langName].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar
