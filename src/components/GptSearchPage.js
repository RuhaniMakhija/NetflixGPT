import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { NETFLIX_BG } from '../utils/constants'

const GptSearchPage = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img src={NETFLIX_BG} alt="bg"/>
      </div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearchPage
