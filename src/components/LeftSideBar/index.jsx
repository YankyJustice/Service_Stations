import { NavLink } from 'react-router-dom'

import styles from './styles.module.scss'

const LeftSideBar = ({ stateSidebar }) => (
  <div className={styles.leftSideBarWrapperFixed}>
    <div
      className={`${styles.leftSideBarWrapper} ${
        stateSidebar && styles.openedSidebar
      }`}
    >
      <div className={styles.links}>
        <NavLink to='autopark' className={styles.link}>
          Park of cars
        </NavLink>
        <NavLink to='service-stations' className={styles.link}>
          Service stations
        </NavLink>
      </div>
    </div>
  </div>
)

export default LeftSideBar
