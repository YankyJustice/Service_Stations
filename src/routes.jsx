import Autopark from './pages/Autopark'
import ServiceStations from './pages/ServiceStations'

export const PublicRoutes = [
  {
    path: '/autopark',
    component: <Autopark />,
    exact: true,
  },
  {
    path: '/service-stations',
    component: <ServiceStations />,
    exact: true,
  },
]
