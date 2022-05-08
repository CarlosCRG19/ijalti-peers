import { useState } from 'react'
import logo from './logo.svg'
import Navbar from './components/Navbar'
import Form from './components/Form'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
		<>	
			<Navbar></Navbar>
			<Form></Form>
		</>
  )
}

export default App
