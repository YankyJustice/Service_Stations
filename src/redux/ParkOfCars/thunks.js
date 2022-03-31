import {
  addStation,
  setCurrentStation,
  setStations,
} from 'src/redux/serviceStations/reducer'

export const addStationsThunk =
  (payload, setModalState, setAcceptableAutos, setStationName) =>
  async (dispatch) => {
    dispatch(addStation(payload))
    setModalState(false)
    setAcceptableAutos([])
    setStationName('')
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

export const orderDetailsThunk =
  (details, setModalState, setDetailsForOrder, currentAuto) =>
  async (dispatch, getState) => {
    const {
      serviceStations: { currentStation, stations },
    } = getState()
    console.log(stations)
    console.log(currentStation)
    const detailsForOrder = []
    const autoIndex = currentStation.acceptableAutos.findIndex(
      (auto) => currentAuto === auto.name,
    )
    details.forEach((detailForOrder) => {
      currentStation.acceptableAutos[autoIndex].details.forEach((detail) => {
        if (detailForOrder.name === detail.name) {
          detailsForOrder.push({
            name: detailForOrder.name,
            count: Number(detailForOrder.count) + Number(detail.count),
          })
        }
      })
      const match = currentStation.acceptableAutos[autoIndex].details.find(
        (findDetail) => findDetail.name === detailForOrder.name,
      )
      if (!match) {
        detailsForOrder.push({
          ...detailForOrder,
          count: Number(detailForOrder.count),
        })
      }
    })

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
  }
