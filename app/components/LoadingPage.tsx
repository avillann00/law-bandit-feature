'use client'

export default function LoadingPage(){
  return(
    <div className='flex items-center justify-center w-screen h-screen bg-gray-200'>
      <div className='w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin'></div>
    </div>
  )
}

