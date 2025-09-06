'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import LoadingPage from './components/LoadingPage'

export default function Home(){
  const router = useRouter()

  const [dataType, setDataType] = useState('')
  const [text, setText] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0){
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async () => {
    try{
      // handle parsing/cleaning data before sending post request
      setLoading(true)

      const info = dataType === 'text' ? text : file

      const response = await axios.post(``, {

      })

      setLoading(false)
      router.push('/')
    }
    catch(error){
      setLoading(false)
      setError(`Error: ${error}`)
      console.error('Error submitting data: ', error)
    }
  }

  if(loading === true){
    return(
      <LoadingPage />
    )
  }

  return(
    <div className='bg-gray-200 w-screen h-screen flex flex-col items-center justify-center text-black gap-2'>
      <h1 className='text-2xl'>Enter Data Then Generate Your Chart.</h1>
      {error && (<h1 className='text-2xl text-red-400'>{error}</h1>)}
      <div className='bg-white w-1/2 h-1/2 rounded-lg shadow-lg flex flex-col items-center justify-center gap-2'>
        <select className='border-2 border-black rounded-lg p-2' onChange={(e) => setDataType(e.target.value)}>
          <option value=''>Select Type of Data</option>
          <option value='text'>Text</option>
          <option value='file'>File</option>
        </select>
        <div className='w-1/2 h-1/2 flex items-center justify-center'>
          {dataType === '' && (
            <div>
              Select a data type to get started!
            </div>
          )}
          {dataType === 'text' && (
            <div className='w-full h-full'>
              <textarea
                placeholder='Explain the data and their values'
                onChange={(e) => setText(e.target.value)}
                className='w-full h-full text-left rounded-lg overflow-auto resize-none p-2'
              />
            </div>
          )}
          {dataType === 'file' && (
            <div className='w-full h-full'> 
              <input
                accept='.csv,.xlsx,.xls,.txt,.pdf'
                type='file'
                onChange={handleFileChange}
                className='w-full h-full rounded-lg border border-dashed p-2 text-center hover:bg-gray-100'
              />
            </div>
          )}
        </div>
        <button className='hover:text-green-400' type='button' onClick={handleSubmit}>Generate</button>
      </div>
    </div>
  )
}
