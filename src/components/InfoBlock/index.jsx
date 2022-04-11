import styles from './styles.module.scss'

const InfoBlock = ({ title, children }) => (
  <div className={styles.container}>
    <div className={styles.header}>{title}</div>
    {children}
  </div>
)

export default InfoBlock
