import { useState, useCallback, useEffect } from 'react'
import './App.css'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()-_=+[{]}|;:',<.>/?`~"

    for (let index = 0; index < length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
    
  }, [length, numberAllowed, charAllowed, setPassword])  

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, setPassword])
  

  return (
    <>
      <div className='w-screen h-screen bg-gray-900 p-10'>
        <h1 className='text-2xl font-bold font-sans text-white text-center'>Password Generator</h1>
        <div className='w-1/2 bg-gray-700 p-5 rounded-md mx-auto mt-10 space-y-4 text-white shadow-2xl'>
          <div className='flex items-center gap-4'>
            <input type="text" className='form-input rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 flex-1 text-gray-900' 
              value={password}
              readOnly
            />
            <button className='w-6 h-6'>
              <ClipboardDocumentListIcon/>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input type="range" name="" id="length"
                min={8}
                max={100}
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="length">Length ({length})</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="numbers" 
                value={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label htmlFor="numbers">Include Numbers</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="characters" 
                value={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label htmlFor="characters">Include Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
