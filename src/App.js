import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { PublicRoutes } from 'src/constants/routes'

import Header from 'src/components/Header'
import LeftSideBar from 'src/components/LeftSideBar'

import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [stateSidebar, setStateSidebar] = useState(false)

  return (
    <div className='container'>
      <ToastContainer theme='light' pauseOnHover={false} position='top-right' />
      <Header setStateSidebar={setStateSidebar} />
      <div className='layout'>
        <LeftSideBar stateSidebar={stateSidebar} />
        <Routes>
          {PublicRoutes.map((route) => (
            <Route
              path={route.path}
              element={route.component}
              key={route.path}
            />
          ))}
        </Routes>
      </div>
    </div>
  )
}

export default App
