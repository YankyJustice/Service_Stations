import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cars: [],
  availableCars: [],
  currentCar: null,
}

export const parkOfCarsSlice = createSlice({
  name: 'parkOfCars',
  initialState,
  reducers: {
    addCarToPark: (state, action) => {
      state.cars.push(action.payload)
    },
    setAvailableCars: (state, action) => {
      state.availableCars = action.payload
    },
    setCurrentCar: (state, action) => {
      state.currentCar = action.payload
    },
    setAvailableStations: (state, action) => {
      state.currentCar.availableStations = action.payload
    },
    setCars: (state, action) => {
      state.cars = action.payload
    },
  },
})

export const {
  addCarToPark,
  setAvailableCars,
  setCurrentCar,
  setAvailableStations,
  setCars,
} = parkOfCarsSlice.actions

export default parkOfCarsSlice.reducer
