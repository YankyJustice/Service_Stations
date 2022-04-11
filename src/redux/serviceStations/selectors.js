import { createSelector } from 'reselect'

const selectState = (state) => state.serviceStations

export const getServiceStations = createSelector(
  selectState,
  (state) => state.stations,
)

export const getCurrentStation = createSelector(
  selectState,
  (state) => state.currentStation,
)
