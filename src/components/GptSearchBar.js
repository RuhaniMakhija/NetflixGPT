import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openAi';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
    const langName=useSelector(store=>store.config.lang);
    const dispatch=useDispatch();
    const searchText=useRef(null);

    //search movie in TMDB
    const searchMovieTMDB=async(movie)=>{
      const data=await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1', API_OPTIONS)
      const json=await data.json();
      return json.results;
    }
    const handleGPTSearchClick=async()=>{
        console.log(searchText.current.value);
        const gptQuery="Act as a Movie Recommendation System and suggest some movies for the query : "+searchText.current.value+". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya"
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
          });
        console.log(gptResults.choices);
        const gptMovies=gptResults.choices?.[0]?.message?.content.split(',');
        //call TMDB api to search each movie

        const promiseArray=gptMovies.map(movie=>searchMovieTMDB(movie));
        const tmdbResults=await Promise.all(promiseArray);
        console.log(tmdbResults);
        dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}));
    }
    
  return (
    <div className='pt-[10%] flex justify-center bg-'>
      <form className='w-1/2 bg-black grid grid-cols-12' onClick={(e)=>e.preventDefault()}>
        <input type='text'
             ref={searchText}
             placeholder={lang[langName].searchPlaceholder}
             className='p-4 m-4 rounded-lg col-span-9'
        />
        <button 
            onClick={handleGPTSearchClick}
            className='px-4 py-2 m-4 font-bold text-xl bg-red-700 text-white rounded-lg col-span-3'>
            {lang[langName].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar
