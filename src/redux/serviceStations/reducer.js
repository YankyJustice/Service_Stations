import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  stations: [
    {
      name: 'tiny airlanes',
      id: 'qwDSADewq',
      acceptableAutos: [
        { name: 'Huyndai', details: [{ name: 'battery', count: 20 }] },
      ],
    },
    {
      name: 'tiny airlanes',
      id: 'qwDSA2Dewq',
      acceptableAutos: [
        { name: 'Huyndai', details: [{ name: 'battery', count: 20 }] },
      ],
    },
    {
      name: 'tiny airlanes',
      id: 'qwDSA3Dewq',
      acceptableAutos: [
        { name: 'Huyndai', details: [{ name: 'battery', count: 20 }] },
      ],
    },
  ],
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
  },
})

export const { addStation, setCurrentStation } = serviceStationsSlice.actions

export default serviceStationsSlice.reducer
