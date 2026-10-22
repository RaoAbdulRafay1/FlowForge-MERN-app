import { useState , useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'


function App() {
  const [status,setStatus] = useState('checking...')
  useEffect( ()=>{
    fetch('http://localhost:4000/health')
    .then((res)=>res.json())
    .then((data)=> setStatus(data.message))
    .catch(()=>setStatus("Server not reachable"))
  },[]
  )
  return(
    <div>
      <h1>FlowForge</h1>
      <p>Automate your workflows</p>
      <p>Server status{status}</p>
    </div>
  )
}

export default App
