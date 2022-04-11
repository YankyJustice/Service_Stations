import { useState } from 'react'

import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import styles from './styles.module.scss'

const ListCheckBox = ({ lists, title, details, handleChange }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={styles.listsContainer}>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ background: '#1976d2', color: 'black', height: 20 }}
      >
        {title}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {lists.map((el) => (
          <MenuItem>
            {el}
            <input
              className={styles.counter}
              type='number'
              placeholder={el}
              min={0}
              value={details.find((detail) => detail.name === el)?.count || 0}
              name={el}
              onChange={(e) =>
                handleChange(e.currentTarget.value, e.currentTarget.name)
              }
            />
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default ListCheckBox
