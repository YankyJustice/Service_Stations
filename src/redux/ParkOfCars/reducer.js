import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cars: [
    { name: 'Huyndai', class: 'Premium', id: 'X435TT161' },
    { name: 'BMW', class: 'Business', id: 'X436TT161' },
    { name: 'Mercedes', class: 'Eco', id: 'X437TT161' },
  ],
  currentStation: null,
}

export const parkOfCarsSlice = createSlice({
  name: 'parkOfCars',
  initialState,
  reducers: {
    addCarToPark: (state, action) => {
      state.cars.push(action.payload)
    },
  },
})

export const { addCarToPark } = parkOfCarsSlice.actions

export default parkOfCarsSlice.reducer
