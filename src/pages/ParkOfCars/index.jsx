import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { TextField } from '@mui/material'

import { getAvailableCars, getCars } from 'src/redux/ParkOfCars/selectors'
import {
  addCarToParkThunk,
  getAvailableCarsThunk,
} from 'src/redux/ParkOfCars/thunks'
import { getServiceStations } from 'src/redux/serviceStations/selectors'

import AddNewCard from 'src/components/AddNewCard'
import Card from 'src/components/Card'
import CustomModal from 'src/components/Modal'
import Select from 'src/components/Select'

import styles from './styles.module.scss'

const ParkOfCars = () => {
  const [modalState, setModalState] = useState(false)
  const [governmentNumber, setGovernmentNumber] = useState('')
  const [autoName, setAutoName] = useState('')
  const autopark = useSelector(getCars)
  const availableCars = useSelector(getAvailableCars)
  const stations = useSelector(getServiceStations)
  const dispatch = useDispatch()

  const handleAddCarToPark = () => {
    dispatch(
      addCarToParkThunk(
        {
          name: autoName,
          id: governmentNumber,
        },
        setModalState,
        setAutoName,
        setGovernmentNumber,
      ),
    )
  }

  const handleOpenModal = () => {
    if (stations.length > 0) {
      dispatch(getAvailableCarsThunk(setModalState))
    } else {
      toast.error('to start, add a station')
    }
  }

  return (
    <div className={styles.wrapper}>
      <AddNewCard handleClick={handleOpenModal} />
      {autopark.map((car) => (
        <Card name={car.name} image={car.icon} id={car.id} key={car.id} />
      ))}

      <CustomModal
        title='Add car to park'
        isOpen={modalState}
        handleClose={() => setModalState(false)}
        buttonTitle='Add car'
        submitModal={handleAddCarToPark}
      >
        <div className={styles.form}>
          <TextField
            id='outlined'
            label='Enter government number'
            value={governmentNumber}
            onChange={(e) => setGovernmentNumber(e.target.value)}
            sx={{ marginBottom: 2, marginTop: 2 }}
          />
          <Select
            items={availableCars || []}
            label='pick car'
            value={autoName}
            handleChange={(e) => setAutoName(e.target.value)}
          />
        </div>
      </CustomModal>
    </div>
  )
}

export default ParkOfCars
