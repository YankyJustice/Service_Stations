import { createSelector } from 'reselect'

const selectState = (state) => state.parkOfCars

export const getCars = createSelector(selectState, (state) => state.cars)
export const getAvailableCars = createSelector(
  selectState,
  (state) => state.availableCars,
)
export const getCurrentCar = createSelector(
  selectState,
  (state) => state.currentCar,
)
