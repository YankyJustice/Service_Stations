import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { TextField } from '@mui/material'
import Button from '@mui/material/Button'

import { details } from 'src/constants/mock'

import { getCurrentStation } from 'src/redux/serviceStations/selectors'
import {
  getCurrentStationThunk,
  orderDetailsThunk,
} from 'src/redux/serviceStations/thunks'

import CustomModal from 'src/components/Modal'

import repair from 'src/assets/png/repair.png'

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
    setDetailsForOrder((prev) =>
      prev.map((detail) =>
        detail.name === detailForOrder
          ? { name: detailForOrder, count: e.target.value }
          : detail,
      ),
    )
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

  return (
    <div className={styles.stationContainer}>
      <div className={styles.stationInfoContainer}>
        <div className={styles.stationInfo}>
          <img className={styles.logo} src={repair} alt='repair' />
          <div className={styles.nameStation}>{currentStation?.name}</div>
        </div>
        <div className={styles.detailsInfo}>
          <div className={styles.detailsInfoHeader}>Details</div>
          <div className={styles.detailsScroll}>
            {currentStation?.acceptableAutos.map((auto) => (
              <>
                <div className={styles.autoBlock}>
                  <span>{auto.name}</span>
                  <Button
                    onClick={() => openModal(auto.name)}
                    sx={{ height: 30, bgcolor: 'green', color: 'black' }}
                  >
                    Order details
                  </Button>
                </div>
                {auto.details
                  .filter((detail) => Number(detail.count) > 0)
                  .map((detail) => (
                    <div className={styles.detailInfo}>
                      <span className={styles.detailName}>{detail.name}:</span>
                      <span className={styles.detailCount}>
                        {detail.count} pc
                      </span>
                    </div>
                  ))}
              </>
            ))}
            <CustomModal
              title='Order details'
              isOpen={modalState}
              handleClose={() => setModalState(false)}
              submitModal={handleOrderDetails}
              buttonTitle='Order'
            >
              <div className={styles.modalContent}>
                {detailsForOrder.map((detail) => (
                  <TextField
                    id='filled-number'
                    label={detail.name}
                    type='number'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={detail.count}
                    onChange={(e) => orderDetails(detail.name, e)}
                    sx={{ marginBottom: 2 }}
                    variant='filled'
                  />
                ))}
              </div>
            </CustomModal>
            <div />
          </div>
        </div>
      </div>
      <div className={styles.autosInfoContainer}>
        <div className={styles.autosWaiting}>qwe</div>
        <div className={styles.autoOnStantion}>qwe</div>
      </div>
    </div>
  )
}

export default Station
