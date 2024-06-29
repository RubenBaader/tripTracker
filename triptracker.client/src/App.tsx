import './App.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from './pages/Layout'
import ErrorPage from './pages/Error.Page'
import Home from './pages/Home.Page'
import Login from './pages/Login.Page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={ <Home /> } />
          <Route path='login' element={ <Login /> } />
          <Route path='*' element={ <ErrorPage /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
