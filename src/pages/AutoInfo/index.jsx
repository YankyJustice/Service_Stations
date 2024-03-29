import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
} from '@mui/material'
import Button from '@mui/material/Button'

import { getNormalizeDate } from 'src/constants/functions'
import { details } from 'src/constants/mock'

import { getCurrentCar } from 'src/redux/ParkOfCars/selectors'
import {
  getAvailableStationsThunk,
  getCurrentCarThunk,
  sendAutoToStationThunk,
} from 'src/redux/ParkOfCars/thunks'

import InfoBlock from 'src/components/InfoBlock'
import CustomModal from 'src/components/Modal'
import BasicSelect from 'src/components/Select'

import styles from './style.module.scss'

const AutoInfo = () => {
  const { autoId } = useParams()
  const dispatch = useDispatch()
  const currentCar = useSelector(getCurrentCar)
  const [modalState, setModalState] = useState(false)
  const [detailsForRepair, setDetailsForRepair] = useState([])
  const [station, setStation] = useState('')

  useEffect(() => {
    dispatch(getCurrentCarThunk(autoId))
  }, [])

  useEffect(() => {
    if (detailsForRepair.length === 0) {
      setStation('')
    }

    currentCar &&
      dispatch(getAvailableStationsThunk(currentCar.name, detailsForRepair))
  }, [detailsForRepair])

  const handleModal = () => {
    dispatch(
      sendAutoToStationThunk(
        station,
        currentCar,
        detailsForRepair,
        setModalState,
      ),
    )
  }

  const handleChooseDetail = (e) => {
    if (detailsForRepair.find((detail) => detail === e.target.name)) {
      setDetailsForRepair((prevState) =>
        prevState.filter((detail) => detail !== e.target.name),
      )
    } else {
      setDetailsForRepair((prevState) => [...prevState, e.target.name])
    }
  }

  return (
    <div className={styles.infoOfCarContainer}>
      <div className={styles.infoOfCar}>
        <img
          className={styles.icon}
          src={currentCar?.icon}
          alt={currentCar?.name}
        />
        <div className={styles.nameOfCar}>{currentCar?.name}</div>
        <div className={styles.governmentNumber}>{currentCar?.id}</div>
        {currentCar?.status === 'sent' ? (
          <div className={styles.statusSent}>Сar in service</div>
        ) : (
          <Button
            variant='contained'
            disableElevation
            onClick={() => setModalState(true)}
          >
            Send for maintenance
          </Button>
        )}
      </div>
      <InfoBlock title='Repair history'>
        {currentCar?.repairHistory?.map((repair) => (
          <Accordion key={repair.id}>
            <AccordionSummary
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <div className={styles.prevInfoCarBlock}>
                <img
                  className={styles.iconCar}
                  src={repair.carIcon}
                  alt={repair.carName}
                />
                <span>{repair.carName}</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.requestInfo}>
                <span className={styles.accordionInfoTitle}>
                  Government number:
                </span>
                <span className={styles.accordionInfoText}>
                  {' '}
                  {repair.carId}
                </span>
              </div>
              <div className={styles.requestInfo}>
                <span className={styles.accordionInfoTitle}>
                  Replacement details:
                </span>
                <span className={styles.accordionInfoText}>
                  {' '}
                  {repair.detailsForRepair.map(
                    (detail, index, arr) =>
                      `${detail}${index + 1 < arr.length ? ', ' : ''}`,
                  )}
                </span>
              </div>
              <div className={styles.requestInfo}>
                <span className={styles.accordionInfoTitle}>Request date:</span>
                <span className={styles.accordionInfoText}>
                  {' '}
                  {getNormalizeDate(repair.requestDate)}
                </span>
              </div>
              <div className={styles.accordionFooter}>
                <span className={styles.date}>
                  {getNormalizeDate(repair.acceptDate)}
                </span>
                <span className={styles.date}>
                  {getNormalizeDate(repair.endDate)}
                </span>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </InfoBlock>
      <CustomModal
        title='Select details to be replaced'
        isOpen={modalState}
        handleClose={() => setModalState(false)}
        submitModal={handleModal}
        buttonTitle='Send'
        btnModalDisabled={
          detailsForRepair.length === 0 ||
          !station ||
          currentCar?.availableStations?.length === 0
        }
      >
        <div className={styles.modalContent}>
          {details.map((detail) => (
            <div key={detail}>
              <Checkbox
                name={detail}
                checked={Boolean(
                  detailsForRepair.find(
                    (detailForRepair) => detailForRepair === detail,
                  ),
                )}
                onChange={handleChooseDetail}
              />{' '}
              {detail}
            </div>
          ))}
          <div className={styles.selectStation}>
            <BasicSelect
              items={currentCar?.availableStations || []}
              label={
                currentCar?.availableStations?.length > 0
                  ? 'Select station'
                  : 'No stations available'
              }
              disabled={!(currentCar?.availableStations?.length > 0)}
              value={station}
              handleChange={(e) => setStation(e.target.value)}
            />
          </div>
        </div>
      </CustomModal>
    </div>
  )
}

export default AutoInfo
