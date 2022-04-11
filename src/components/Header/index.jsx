import burger from 'src/assets/png/burger.png'
import car from 'src/assets/png/titleCar.png'

import styles from './styles.module.scss'

const Header = ({ setStateSidebar }) => (
  <div className={styles.headerWrapper}>
    <div className={styles.startIcons}>
      <div onClick={() => setStateSidebar((prev) => !prev)}>
        <img src={burger} alt='titleCar' className={styles.burgerimg} />
      </div>
      <img src={car} alt='titleCar' className={styles.headerTitleImg} />
    </div>
    <span>Cars repair</span>
  </div>
)

export default Header
