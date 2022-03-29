import { useState } from 'react'

import AddNewCard from 'src/components/AddNewCard'
import Card from 'src/components/Card'
import CustomModal from 'src/components/Modal'

import repair from 'src/assets/png/repair.png'

import styles from './styles.module.scss'

const stations = [
  { name: 'tiny airlanes', id: 1, AcceptableCard: ['Huyndai', 'BMW'] },
  { name: 'tiny airlanes', id: 1, AcceptableCard: ['Huyndai', 'BMW'] },
  { name: 'tiny airlanes', id: 1, AcceptableCard: ['Huyndai', 'BMW'] },
]

const ServiceStations = () => {
  const [modalState, setModalState] = useState(false)
  return (
    <div className={styles.wrapper}>
      {stations.map((station) => (
        <Card name={station.name} image={repair} />
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

export default ServiceStations
