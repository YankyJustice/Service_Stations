import { configureStore } from '@reduxjs/toolkit'

import parkOfCars from 'src/redux/ParkOfCars/reducer'
import serviceStations from 'src/redux/serviceStations/reducer'

export const store = configureStore({
  reducer: {
    serviceStations,
    parkOfCars,
  },
})
