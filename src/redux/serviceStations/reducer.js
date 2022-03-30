import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  stations: [
    { name: 'tiny airlanes', id: 1, AcceptableCard: ['Huyndai', 'BMW'] },
    { name: 'tiny airlanes', id: 2, AcceptableCard: ['Huyndai', 'BMW'] },
    { name: 'tiny airlanes', id: 3, AcceptableCard: ['Huyndai', 'BMW'] },
  ],
  currentStation: null,
}

export const serviceStationsSlice = createSlice({
  name: 'serviceStations',
  initialState,
  reducers: {
    decrement: (state) => {
      state.value += 100
    },
  },
})

export const { decrement } = serviceStationsSlice.actions

export default serviceStationsSlice.reducer
