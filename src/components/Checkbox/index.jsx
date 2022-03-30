import styles from './styles.module.scss'

const Checkbox = ({ handleChange, checked, handleArgs, disabled }) => (
  <label className={`${styles.label} ${disabled && styles.checkBoxDisabled}`}>
    <input
      className={styles.input}
      type='checkbox'
      checked={checked}
      disabled={disabled}
      onChange={() => handleChange(handleArgs)}
    />
    <span className={styles.span} />
  </label>
)

export default Checkbox
