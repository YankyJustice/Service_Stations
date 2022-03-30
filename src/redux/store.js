import { configureStore } from '@reduxjs/toolkit'

import serviceStations from 'src/redux/serviceStations/reducer'

export const store = configureStore({
  reducer: {
    serviceStations,
  },
})
