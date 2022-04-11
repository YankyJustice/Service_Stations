import { toast } from 'react-toastify'

import _ from 'lodash'

import { changeDetailsCount, getRandomString } from 'src/constants/functions'
import { details as mockDetails } from 'src/constants/mock'

import { setCars } from 'src/redux/ParkOfCars/reducer'
import {
  addStation,
  setCurrentStation,
  setStations,
} from 'src/redux/serviceStations/reducer'

export const addStationsThunk =
  (payload, setModalState, setAcceptableAutos, setStationName) =>
  async (dispatch, getState) => {
    const {
      serviceStations: { stations },
    } = getState()
    try {
      if (!payload.name) {
        throw String('Enter the name of station')
      }
      if (payload.name && payload.name.length < 5) {
        throw String('Min length name of station 5')
      }
      if (payload.acceptableAutos.length === 0) {
        throw String('Please select at least one car')
      }
      if (stations.find((station) => station.name === payload.name)) {
        throw String('Station already exist')
      }
      dispatch(
        addStation({ ...payload, repairHistory: [], repairRequests: [] }),
      )
      setModalState(false)
      setAcceptableAutos([])
      setStationName('')
      toast.success('Station added successfully ')
    } catch (e) {
      toast.error(e)
    }
  }

export const getCurrentStationThunk =
  (stationId) => async (dispatch, getState) => {
    const {
      serviceStations: { stations },
    } = getState()
    dispatch(
      setCurrentStation(
        stations.find((station) => String(station.id) === String(stationId)),
      ),
    )
  }

export const acceptForRepairThunk =
  (requestData, currentStation) => async (dispatch, getState) => {
    const {
      serviceStations: { stations },
    } = getState()
    const changeDetails = changeDetailsCount(
      currentStation,
      requestData.carName,
      requestData.detailsForRepair.map((detail) => ({
        name: detail,
        count: -1,
      })),
    )
    dispatch(
      setStations(
        stations.map((station) => {
          if (station.id === currentStation.id) {
            return {
              ...station,
              repairRequests: station.repairRequests.filter(
                (request) => request.carName !== requestData.carName,
              ),
              repairHistory: [
                ...station.repairHistory,
                {
                  ...requestData,
                  id: getRandomString(),
                  acceptDate: Date.now(),
                },
              ],
              acceptableAutos: station.acceptableAutos.map((auto) => {
                if (auto.name === requestData.carName) {
                  return {
                    ...auto,
                    details: _.uniqBy(
                      changeDetails.concat(auto.details),
                      'name',
                    ),
                  }
                }
                return auto
              }),
            }
          }
          return station
        }),
      ),
    )
    dispatch(getCurrentStationThunk(currentStation.id))
  }

export const completeServiceThunk =
  (currentRepair, currentStation) => async (dispatch, getState) => {
    const {
      serviceStations: { stations },
      parkOfCars: { cars },
    } = getState()

    dispatch(
      setStations(
        stations.map((station) => ({
          ...station,
          repairHistory: station.repairHistory.map((repair) => {
            if (repair.id === currentRepair.id) {
              return {
                ...repair,
                endDate: Date.now(),
              }
            }
            return repair
          }),
        })),
      ),
    )
    dispatch(
      setCars(
        cars.map((car) => {
          if (car.id === currentRepair.carId) {
            return {
              ...car,
              repairHistory: [
                ...car.repairHistory,
                { ...currentRepair, endDate: Date.now() },
              ],
              status: 'complete',
            }
          }
          return car
        }),
      ),
    )
    dispatch(getCurrentStationThunk(currentStation.id))
  }

export const orderDetailsThunk =
  (details, setModalState, setDetailsForOrder, currentAuto) =>
  async (dispatch, getState) => {
    const {
      serviceStations: { currentStation, stations },
    } = getState()

    const detailsForOrder = changeDetailsCount(
      currentStation,
      currentAuto,
      details,
    )
    dispatch(
      setStations(
        stations.map((station) => {
          if (station.id === currentStation.id) {
            return {
              ...station,
              acceptableAutos: station.acceptableAutos.map((auto) => {
                if (auto.name === currentAuto) {
                  return {
                    ...auto,
                    details: detailsForOrder,
                  }
                }
                return auto
              }),
            }
          }
          return station
        }),
      ),
    )
    dispatch(getCurrentStationThunk(currentStation.id))
    setModalState(false)
    setDetailsForOrder(
      mockDetails.map((detail) => ({ name: detail, count: 0 })),
    )
    toast.success('Details ordered successfully')
  }
