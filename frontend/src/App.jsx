import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { tokenLoader, checkAuthToken } from './util/auth';
import { action as loginAction } from './pages/Auth/Login';
import { action as signupAction } from './pages/Auth/Signup';
import { action as logoutAction } from './pages/Auth/Logout';
import { action as employeeAction, loader as employeeLoader } from './pages/Dashboard/Employee';
import Home from './pages/Dashboard/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Employee from './pages/Dashboard/Employee';

function App() {

  const router = createBrowserRouter([
    {
      path: '/', loader: tokenLoader, children: [
        { path: 'login', element: <Login />, action: loginAction },
        { path: 'signup', element: <Signup />, action: signupAction },
        { path: 'logout', action: logoutAction },
        {
          path: '/dashboard', element: <Dashboard />, loader: checkAuthToken, children: [
            { index: true, element: <Home /> },
            { path: 'employee', element: <Employee />, loader: employeeLoader, action: employeeAction }
          ]
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
