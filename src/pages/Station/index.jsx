import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getCurrentStation } from 'src/redux/serviceStations/selectors'
import { getCurrentStationThunk } from 'src/redux/serviceStations/thunks'

import repair from 'src/assets/png/repair.png'

import styles from './style.module.scss'

const Station = () => {
  const { stationId } = useParams()
  const currentStation = useSelector(getCurrentStation)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentStationThunk(stationId))
  }, [])

  console.log(currentStation)

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
                <div className={styles.autoName}>{auto.name}:</div>
                <div className={styles.detailsHeader} />
                {auto.details.map((el) => (
                  <div className={styles.detailInfo}>
                    <span className={styles.detailName}>{el.name}:</span>
                    <span className={styles.detailCount}>{el.count} pc</span>
                  </div>
                ))}
              </>
            ))}
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
