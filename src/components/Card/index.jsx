import { Link } from 'react-router-dom'

import repair from 'src/assets/png/repair.png'

import styles from './styles.module.scss'

const Card = ({ name }) => {
  const qwe = ''
  return (
    <Link to='qwe' className={styles.link}>
      <div className={styles.cardWrapper}>
        {name}

        <img src={repair} className={styles.repairImg} alt='repair' />
      </div>
    </Link>
  )
}

export default Card
