import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video pt-[25%] px-16 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-5xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/4'>{overview}</p>
      <div className=''>
        <button className='bg-white px-14 py-4 text-black font-bold text-xl rounded-lg hover:bg-opacity-80'>
            ▶️ Play
        </button>
        <button className='mx-2 bg-gray-500 px-14 py-4 text-white font-bold text-xl bg-opacity-50 rounded-lg hover:bg-opacity-80'>
            More Info
        </button>
      </div>
    </div>
  )
}

export default VideoTitle
