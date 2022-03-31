import { useState } from 'react'

import { TextField } from '@mui/material'

import { autos } from 'src/constants/mock'

import AddNewCard from 'src/components/AddNewCard'
import Card from 'src/components/Card'
import CustomModal from 'src/components/Modal'
import Select from 'src/components/Select'

import businessCar from 'src/assets/png/bussinesCar.png'
import ecoCar from 'src/assets/png/ecoCar.png'
import premiumCar from 'src/assets/png/premiumCar.png'

import styles from 'src/pages/ServiceStations/styles.module.scss'

const autopark = [
  { name: 'Huyndai', class: 'Premium', id: 1 },
  { name: 'BMW', class: 'Business', id: 1 },
  { name: 'Mercedes', class: 'Eco', id: 1 },
]

const ParkOfCars = () => {
  const [modalState, setModalState] = useState(false)
  const [nameStation, setNameStation] = useState('')
  return (
    <div className={styles.wrapper}>
      {autopark.map((car) => (
        <Card
          name={car.name}
          image={
            (car.class === 'Eco' && ecoCar) ||
            (car.class === 'Business' && businessCar) ||
            (car.class === 'Premium' && premiumCar)
          }
        />
      ))}
      <AddNewCard handleClick={() => setModalState(true)} />
      <CustomModal
        title='Add car to park'
        isOpen={modalState}
        handleClose={() => setModalState(false)}
        buttonTitle='Add car'
      >
        <div className={styles.form}>
          <TextField
            id='outlined'
            label='Enter name station'
            value={nameStation}
            onChange={(e) => setNameStation(e.target.value)}
            sx={{ marginBottom: 2, marginTop: 2 }}
          />
          <Select items={autos} label='pick car' />
        </div>
      </CustomModal>
    </div>
  )
}

export default ParkOfCars
