import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from './pages/Layout.Page'
import ErrorPage from './pages/Error.Page'
import Home from './pages/Home.Page'
import Login from './pages/Login.Page'
import CreateUser from './pages/CreateUser.Page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={ <Home /> } />
          <Route path='login' element={ <Login /> } />
          <Route path='create' element={<CreateUser /> } />
          <Route path='*' element={ <ErrorPage /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
