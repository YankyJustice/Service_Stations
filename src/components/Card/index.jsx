import { Link } from 'react-router-dom'

import styles from './styles.module.scss'

const Card = ({ name, image, id }) => {
  const qwe = ''
  return (
    <Link to={`${id}`} className={styles.link}>
      <div className={styles.cardWrapper}>
        {name}
        <img src={image} className={styles.repairImg} alt='repair' />
      </div>
    </Link>
  )
}

export default Card
