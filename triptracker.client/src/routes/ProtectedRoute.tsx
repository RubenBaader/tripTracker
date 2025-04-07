import { Navigate, Outlet } from 'react-router-dom'
import { useAppContext } from '../contexts/App.Context'

const ProtectedRoutes = () => {
    const authorized : boolean = useAppContext().userLoggedIn
    
    return (
      authorized ? <Outlet/> : <Navigate to='/login'/>
    )
  }

export default ProtectedRoutes;