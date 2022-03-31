import {
  addStation,
  setCurrentStation,
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
