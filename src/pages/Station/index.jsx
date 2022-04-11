import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
} from '@mui/material'
import Button from '@mui/material/Button'

import { getNormalizeDate } from 'src/constants/functions'
import { details } from 'src/constants/mock'

import { getCurrentStation } from 'src/redux/serviceStations/selectors'
import {
  acceptForRepairThunk,
  completeServiceThunk,
  getCurrentStationThunk,
  orderDetailsThunk,
} from 'src/redux/serviceStations/thunks'

import InfoBlock from 'src/components/InfoBlock'
import CustomModal from 'src/components/Modal'

import repairImg from 'src/assets/png/repair.png'

import styles from './style.module.scss'

const Station = () => {
  const [modalState, setModalState] = useState(false)
  const [currentAuto, setCurrentAuto] = useState('')
  const [detailsForOrder, setDetailsForOrder] = useState(
    details.map((detail) => ({ name: detail, count: 0 })),
  )
  const { stationId } = useParams()
  const currentStation = useSelector(getCurrentStation)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentStationThunk(stationId))
  }, [])

  const openModal = (autoName) => {
    setModalState(true)
    setCurrentAuto(autoName)
  }

  const orderDetails = (detailForOrder, e) => {
    e.target.value >= 0 &&
      setDetailsForOrder((prev) =>
        prev.map((detail) =>
          detail.name === detailForOrder
            ? { name: detailForOrder, count: e.target.value }
            : detail,
        ),
      )
  }

  const acceptForRepair = (requestData) => {
    dispatch(acceptForRepairThunk(requestData, currentStation))
  }

  const handleOrderDetails = () => {
    dispatch(
      orderDetailsThunk(
        detailsForOrder,
        setModalState,
        setDetailsForOrder,
        currentAuto,
      ),
    )
  }

  const completeService = (repair) => {
    dispatch(completeServiceThunk(repair, currentStation))
  }

  return (
    <div className={styles.stationContainer}>
      <div className={styles.stationInfoContainer}>
        <div className={styles.stationInfo}>
          <img className={styles.logo} src={repairImg} alt='repair' />
          <div className={styles.nameStation}>{currentStation?.name}</div>
        </div>
        <InfoBlock title='Details'>
          <div className={styles.detailsScroll}>
            {currentStation?.acceptableAutos.map((auto) => (
              <div key={auto.name}>
                <div className={styles.autoBlock} key={auto.name}>
                  <span>{auto.name}</span>
                  <Button
                    onClick={() => openModal(auto.name)}
                    variant='contained'
                    disableElevation
                  >
                    Order details
                  </Button>
                </div>
                {auto.details
                  .filter((detail) => Number(detail.count) > 0)
                  .map((detail) => (
                    <div className={styles.detailInfo} key={detail.name}>
                      <span className={styles.detailName}>{detail.name}:</span>
                      <span className={styles.detailCount}>
                        {detail.count} pc
                      </span>
                    </div>
                  ))}
              </div>
            ))}
            <CustomModal
              title='Order details'
              isOpen={modalState}
              handleClose={() => setModalState(false)}
              submitModal={handleOrderDetails}
              buttonTitle='Order'
            >
              <div className={styles.modalContentService}>
                {detailsForOrder.map((detail) => (
                  <TextField
                    key={detail.name}
                    id='filled-number'
                    label={detail.name}
                    type='number'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={detail.count}
                    onChange={(e) => orderDetails(detail.name, e)}
                    sx={{ marginBottom: 2 }}
                  />
                ))}
              </div>
            </CustomModal>
            <div />
          </div>
        </InfoBlock>
      </div>
      <div className={styles.autosInfoContainer}>
        <InfoBlock title='Repair requests'>
          {currentStation?.repairRequests?.map((request) => (
            <Accordion key={request.carId}>
              <AccordionSummary
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <div className={styles.prevInfoCarBlock}>
                  <img
                    className={styles.iconCar}
                    src={request.carIcon}
                    alt={request.carName}
                  />
                  <span>{request.carName}</span>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className={styles.requestInfo}>
                  <span className={styles.accordionInfoTitle}>
                    Government number:
                  </span>
                  <span className={styles.accordionInfoText}>
                    {' '}
                    {request.carId}
                  </span>
                </div>
                <div className={styles.requestInfo}>
                  <span className={styles.accordionInfoTitle}>
                    Replacement details:
                  </span>
                  <span className={styles.accordionInfoText}>
                    {' '}
                    {request.detailsForRepair.map(
                      (detail, index, arr) =>
                        `${detail}${index + 1 < arr.length ? ', ' : ''}`,
                    )}
                  </span>
                </div>
                <div className={styles.accordionFooter}>
                  <span className={styles.date}>
                    {getNormalizeDate(request.requestDate)}
                  </span>
                  <Button
                    onClick={() => acceptForRepair(request)}
                    variant='contained'
                    color='success'
                  >
                    Accept
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </InfoBlock>
        <InfoBlock title='Repair history'>
          {currentStation?.repairHistory?.map((repair) => (
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
                  <span className={styles.accordionInfoTitle}>
                    Request date:
                  </span>
                  <span className={styles.accordionInfoText}>
                    {' '}
                    {getNormalizeDate(repair.requestDate)}
                  </span>
                </div>
                <div className={styles.accordionFooter}>
                  <span className={styles.date}>
                    {getNormalizeDate(repair.acceptDate)}
                  </span>
                  {repair.endDate ? (
                    <span className={styles.date}>
                      {getNormalizeDate(repair.endDate)}
                    </span>
                  ) : (
                    <Button
                      onClick={() => completeService(repair)}
                      variant='contained'
                      color='error'
                    >
                      Complete service
                    </Button>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </InfoBlock>
      </div>
    </div>
  )
}

export default Station
