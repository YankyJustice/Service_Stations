import ParkOfCars from '../pages/ParkOfCars'
import ServiceStations from '../pages/ServiceStations'

export const PublicRoutes = [
  {
    path: '/autopark',
    component: <ParkOfCars />,
    exact: true,
  },
  {
    path: '/service-stations',
    component: <ServiceStations />,
    exact: true,
  },
]
