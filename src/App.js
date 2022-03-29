import { Routes, Route } from 'react-router-dom'

import Header from 'src/components/Header'
import LeftSideBar from 'src/components/LeftSideBar'

import { PublicRoutes } from 'src/constants/routes'

const App = () => {
  const qwe = 12
  return (
    <div className='container'>
      <Header />
      <div className='layout'>
        <LeftSideBar />
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
