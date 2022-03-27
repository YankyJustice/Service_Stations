import { Routes, Route } from 'react-router-dom'
import LeftSideBar from './components/LeftSideBar'
import { PublicRoutes } from './routes'

const App = () => {
  const qwe = 12
  return (
    <div className='layout'>
      <LeftSideBar />
      <Routes>
        {PublicRoutes.map((route) => (
          <Route path={route.path} element={route.component} key={route.path} />
        ))}
      </Routes>
    </div>
  )
}

export default App
