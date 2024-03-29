import { AddCard } from 'src/assets/svg'

import styles from './styles.module.scss'

const AddNewCard = ({ handleClick }) => (
  <div className={styles.cardWrapper} onClick={() => handleClick()}>
    <AddCard />
  </div>
)

export default AddNewCard
