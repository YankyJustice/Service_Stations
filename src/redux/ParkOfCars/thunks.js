import { toast } from 'react-toastify'

import { autos, regExpGovernmentNumber } from 'src/constants/mock'

import {
  addCarToPark,
  setAvailableCars,
  setAvailableStations,
  setCars,
  setCurrentCar,
} from 'src/redux/ParkOfCars/reducer'
import { setStations } from 'src/redux/serviceStations/reducer'

export const addCarToParkThunk =
  (payload, setModalState, setAutoName, setGovernmentNumber) =>
  async (dispatch, getState) => {
    try {
      const {
        parkOfCars: { cars },
      } = getState()
      if (!regExpGovernmentNumber.test(payload.id)) {
        throw String('Government number should be looks like А777АА131')
      }
      if (!payload.name) {
        throw String('Please select the car')
      }
      if (cars.find((car) => car.id === payload.id)) {
        throw String('Car with this government number already exist')
      }
      const { icon } = autos.find((auto) => auto.name === payload.name)
      dispatch(addCarToPark({ ...payload, icon }))
      console.log(icon)
      setModalState(false)
      setAutoName('')
      setGovernmentNumber('')
      toast.success('Car successfully added to park')
    } catch (e) {
      toast.error(e)
    }
  }

export const getAvailableCarsThunk =
  (setModalState) => async (dispatch, getState) => {
    const {
      serviceStations: { stations },
    } = getState()
    const allCarsOnStations = [
      ...new Set(
        stations
          .map((station) => station.acceptableAutos)
          .flat()
          .map((auto) => auto.name),
      ),
    ]
    dispatch(setAvailableCars(allCarsOnStations))

    setModalState(true)
  }

export const getCurrentCarThunk = (autoId) => async (dispatch, getState) => {
  const {
    parkOfCars: { cars },
  } = getState()
  dispatch(setCurrentCar(cars.find((car) => car.id === autoId)))
}

export const getAvailableStationsThunk =
  (nameOfCar, detailsForRepair) => async (dispatch, getState) => {
    const {
      serviceStations: { stations },
    } = getState()

    const availableDetails = []

    stations.forEach((station) => {
      station.acceptableAutos.forEach((auto) => {
        auto.name === nameOfCar &&
          detailsForRepair.forEach((detailForRepair) => {
            auto.details.forEach((detail) => {
              detail.name === detailForRepair &&
                Number(detail.count) > 0 &&
                availableDetails.push({
                  stationName: station.name,
                  [detailForRepair]: true,
                })
            })
          })
      })
    })

    const availableStations = stations
      .map((station) =>
        availableDetails.filter(
          (detail) => station.name === detail.stationName,
        ),
      )
      .filter((station) => station.length === detailsForRepair.length)
      .map((details) => details[0]?.stationName || undefined)

    if (!availableStations.find((station) => station)) {
      dispatch(setAvailableStations([]))
    } else {
      dispatch(setAvailableStations(availableStations))
    }
  }

export const sendAutoToStationThunk =
  (currentStation, currentCar, detailsForRepair, setModalState) =>
  async (dispatch, getState) => {
    const {
      serviceStations: { stations },
      parkOfCars,
    } = getState()
    dispatch(
      setStations(
        stations.map((station) => {
          if (station.name === currentStation) {
            return {
              ...station,
              repairRequests: [
                ...station.repairRequests,
                {
                  carName: currentCar.name,
                  carId: currentCar.id,
                  carIcon: currentCar.icon,
                  detailsForRepair,
                  requestDate: Date.now(),
                },
              ],
            }
          }
          return station
        }),
      ),
    )

    dispatch(
      setCars(
        parkOfCars.cars.map((car) => {
          if (car.id === currentCar.id) {
            return {
              ...car,
              status: 'sent',
            }
          }
          return car
        }),
      ),
    )
    toast.success('The car has been sent for service')
    dispatch(getCurrentCarThunk(currentCar.id))
    setModalState(false)
  }
