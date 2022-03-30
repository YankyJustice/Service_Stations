import { useState } from 'react'
import { useSelector } from 'react-redux'

import { getServiceStations } from 'src/redux/serviceStations/selectors'

import AddNewCard from 'src/components/AddNewCard'
import Card from 'src/components/Card'
import CustomModal from 'src/components/Modal'
import BasicSelect from 'src/components/Select'

import repair from 'src/assets/png/repair.png'

import styles from './styles.module.scss'

const ServiceStations = () => {
  const [modalState, setModalState] = useState(false)
  const stations = useSelector(getServiceStations)
  const [autos, setAutos] = useState(['Huyndai', 'Mercedes', 'Mazda'])

  return (
    <div className={styles.wrapper}>
      {stations.map((station) => (
        <Card name={station.name} image={repair} key={station.id} />
      ))}
      <AddNewCard handleClick={() => setModalState(true)} />
      <CustomModal
        title='Add service station'
        isOpen={modalState}
        handleClose={() => setModalState(false)}
      >
        <form />
      </CustomModal>
    </div>
  )
}

export default ServiceStations
