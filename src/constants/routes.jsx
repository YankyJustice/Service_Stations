import AutoInfo from 'src/pages/AutoInfo'
import Station from 'src/pages/Station'

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
  {
    path: '/service-stations/:stationId',
    component: <Station />,
    exact: true,
  },
  {
    path: '/autopark/:autoId',
    component: <AutoInfo />,
    exact: true,
  },
]
