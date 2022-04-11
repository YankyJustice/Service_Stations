import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  stations: [],
  currentStation: null,
}

export const serviceStationsSlice = createSlice({
  name: 'serviceStations',
  initialState,
  reducers: {
    addStation: (state, action) => {
      state.stations.push(action.payload)
    },
    setCurrentStation: (state, action) => {
      state.currentStation = action.payload
    },
    setStations: (state, action) => {
      state.stations = action.payload
    },
  },
})

export const { addStation, setCurrentStation, setStations } =
  serviceStationsSlice.actions

export default serviceStationsSlice.reducer
