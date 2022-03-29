import { useState } from 'react'

import AddNewCard from 'src/components/AddNewCard'
import Card from 'src/components/Card'
import CustomModal from 'src/components/Modal'

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
        title='Add service station'
        isOpen={modalState}
        handleClose={() => setModalState(false)}
      >
        <div>qwe</div>
      </CustomModal>
    </div>
  )
}

export default ParkOfCars
