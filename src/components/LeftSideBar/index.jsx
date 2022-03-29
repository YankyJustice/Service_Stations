import { Link } from 'react-router-dom'

import styles from './styles.module.scss'

const LeftSideBar = () => {
  const qwe = ''
  return (
    <div className={styles.leftSideBarWrapper}>
      <div className={styles.links}>
        <Link to='autopark' className={styles.link}>
          Park of cars
        </Link>
        <Link to='service-stations' className={styles.link}>
          Service stations
        </Link>
      </div>
    </div>
  )
}

export default LeftSideBar
