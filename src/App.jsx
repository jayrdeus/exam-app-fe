import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './Components/ProtectedRoute';
import SignIn from './Components/SignIn';
import Users from './Components/Users';
import Create from './Components/Users/Create';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={< SignIn/>} />
      <Route path='users' element={<ProtectedRoute />} >
        <Route path='' element={<Users />} />
        <Route path='create' element={<Create/>} />
      </Route>
    </Routes>
      
  )
}

export default App
