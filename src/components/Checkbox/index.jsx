import styles from './styles.module.scss'

const Checkbox = ({ handleChange, checked, disabled, name }) => (
  <label className={`${styles.label} ${disabled && styles.checkBoxDisabled}`}>
    <input
      className={styles.input}
      type='checkbox'
      checked={checked}
      name={name}
      disabled={disabled}
      onChange={(e) => handleChange(e.currentTarget.name)}
    />
    <span className={styles.span} />
  </label>
)

export default Checkbox
