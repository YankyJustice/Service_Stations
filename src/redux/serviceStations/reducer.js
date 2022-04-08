import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  stations: [
    {
      name: 'tiny airlanes1',
      id: 'qwDSADewq',
      acceptableAutos: [
        {
          name: 'Hyundai',
          details: [{ name: 'battery', count: 20 }],
        },
      ],
      repairRequests: [],
      repairHistory: [],
    },
    {
      name: 'tiny airlanes2',
      id: 'qwDSA2Dewq',
      acceptableAutos: [
        { name: 'Hyundai', details: [{ name: 'battery', count: 20 }] },
      ],
      repairRequests: [],
      repairHistory: [],
    },
    {
      name: 'tiny airlanes3',
      id: 'qwDSA3Dewq',
      acceptableAutos: [
        { name: 'Hyundai', details: [{ name: 'battery', count: 20 }] },
      ],
      repairRequests: [],
      repairHistory: [],
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
    setStations: (state, action) => {
      state.stations = action.payload
    },
  },
})

export const { addStation, setCurrentStation, setStations } =
  serviceStationsSlice.actions

export default serviceStationsSlice.reducer
