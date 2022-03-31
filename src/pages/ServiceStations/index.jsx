import { useState } from 'react'
import { useSelector } from 'react-redux'

import { TextField } from '@mui/material'

import { autos, details } from 'src/constants/mock'

import { getServiceStations } from 'src/redux/serviceStations/selectors'

import AddNewCard from 'src/components/AddNewCard'
import Card from 'src/components/Card'
import Checkbox from 'src/components/Checkbox'
import ListCheckBox from 'src/components/ListCheckBox'
import CustomModal from 'src/components/Modal'

import repair from 'src/assets/png/repair.png'

import styles from './styles.module.scss'

const ServiceStations = () => {
  const [modalState, setModalState] = useState(false)
  const stations = useSelector(getServiceStations)
  const [acceptableAutos, setAcceptableAutos] = useState([])
  const [stationName, setStationName] = useState('')

  const handleCheckAuto = (value) => {
    const match = acceptableAutos.find((auto) => auto.name === value)
    match
      ? setAcceptableAutos((prev) => prev.filter((auto) => auto.name !== value))
      : setAcceptableAutos((prev) => [...prev, { name: value, details: [] }])
  }

  const handleAddDetail = (name) => (value, detailName) => {
    setAcceptableAutos((prev) =>
      prev.map((auto) => {
        if (auto.name === name) {
          return {
            ...auto,
            details: [
              ...auto.details.filter((detail) => detail.name !== detailName),
              { name: detailName, count: value },
            ],
          }
        }
        return auto
      }),
    )
  }

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
        <div className={styles.form}>
          <TextField
            id='outlined'
            label='Enter name station'
            defaultValue={stationName}
            onChange={(e) => setStationName(e.currentTarget.value)}
            sx={{ marginBottom: 2, marginTop: 2 }}
          />
          <div className={styles.checkBoxes}>
            {autos.map((auto) => (
              <div className={styles.checkBoxWrapper}>
                <div className={styles.checkBox}>
                  <span>{auto}</span>
                  <Checkbox
                    name={auto}
                    handleChange={handleCheckAuto}
                    checked={Boolean(
                      acceptableAutos.find(
                        (acceptableAuto) => acceptableAuto.name === auto,
                      ),
                    )}
                  />
                </div>
                {acceptableAutos.map(
                  (acceptableAuto) =>
                    acceptableAuto.name === auto && (
                      <ListCheckBox
                        lists={details}
                        title='Details'
                        handleChange={handleAddDetail(acceptableAuto.name)}
                        details={acceptableAuto.details}
                      />
                    ),
                )}
              </div>
            ))}
          </div>
        </div>
      </CustomModal>
    </div>
  )
}

export default ServiceStations
