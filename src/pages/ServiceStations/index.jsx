import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Checkbox, TextField } from '@mui/material'

import { getRandomString } from 'src/constants/functions'
import { autos, details } from 'src/constants/mock'

import { getServiceStations } from 'src/redux/serviceStations/selectors'
import { addStationsThunk } from 'src/redux/serviceStations/thunks'

import AddNewCard from 'src/components/AddNewCard'
import Card from 'src/components/Card'
import ListCheckBox from 'src/components/ListCheckBox'
import CustomModal from 'src/components/Modal'

import repair from 'src/assets/png/repair.png'

import styles from './styles.module.scss'

const ServiceStations = () => {
  const [modalState, setModalState] = useState(false)
  const stations = useSelector(getServiceStations)
  const [acceptableAutos, setAcceptableAutos] = useState([])
  const [stationName, setStationName] = useState('')
  const dispatch = useDispatch()

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

  const handleAddService = () => {
    dispatch(
      addStationsThunk(
        { name: stationName, acceptableAutos, id: getRandomString() },
        setModalState,
        setAcceptableAutos,
        setStationName,
      ),
    )
  }

  return (
    <div className={styles.wrapper}>
      {stations.map((station) => (
        <Card
          name={station.name}
          image={repair}
          key={station.id}
          id={station.id}
        />
      ))}
      <AddNewCard handleClick={() => setModalState(true)} />
      <CustomModal
        title='Add service station'
        isOpen={modalState}
        handleClose={() => setModalState(false)}
        submitModal={handleAddService}
        buttonTitle='Add service'
      >
        <div className={styles.form}>
          <TextField
            id='outlined'
            label='Enter the name of station'
            value={stationName}
            onChange={(e) => setStationName(e.currentTarget.value)}
            sx={{ marginBottom: 2, marginTop: 2 }}
          />
          <div>
            {autos.map((auto) => (
              <div className={styles.checkBoxWrapper} key={auto.name}>
                <div className={styles.checkBox}>
                  <Checkbox
                    name={auto.name}
                    onChange={(e) => handleCheckAuto(e.target.name)}
                    checked={Boolean(
                      acceptableAutos.find(
                        (acceptableAuto) => acceptableAuto.name === auto.name,
                      ),
                    )}
                    n
                  />
                  <span>{auto.name}</span>
                </div>
                {acceptableAutos.map(
                  (acceptableAuto) =>
                    acceptableAuto.name === auto.name && (
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
