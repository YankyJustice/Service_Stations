import car from 'src/assets/png/titleCar.png'

import styles from './styles.module.scss'

const Header = () => {
  const qwe = ''
  return (
    <div className={styles.headerWrapper}>
      <img src={car} alt='titleCar' className={styles.headerTitleImg} />
      <span>Cars repair</span>
    </div>
  )
}

export default Header
