import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from './pages/Layout.Page'
import ErrorPage from './pages/Error.Page'
import Home from './pages/Home.Page'
import Login from './pages/Login.Page'
import CreateUser from './pages/CreateUser.Page'
import { AppContextProvider } from './contexts/App.Context'
import ProtectedRoutes from './routes/ProtectedRoute'
import LogoutButton from './components/LogoutButton'

function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route element={<ProtectedRoutes />}> 
              <Route index element={ <Home /> } />
            </Route>
            <Route path='login' element={ <Login /> } />
            <Route path='logout' element={ <LogoutButton /> } />
            <Route path='create' element={<CreateUser /> } />
            <Route path='*' element={ <ErrorPage /> } />
          </Route>
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  )
}

export default App
