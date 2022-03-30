import { decrement } from 'src/redux/serviceStations/reducer'

export const addService = () => async (dispatch) => {
  dispatch(decrement())
}
