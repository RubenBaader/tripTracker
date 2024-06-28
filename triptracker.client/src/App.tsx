import './App.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { TripForm } from './components/TripForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <div>Layout</div> }>
          <Route index element={ <div>Home</div> } />
          <Route path='login' element={ <div>Login</div> } />
          <Route path='*' element={ <div>404</div> } />
        </Route>
      </Routes>

      <h1>Hi mom</h1>
      <TripForm />
    </BrowserRouter>
  )
}

export default App
