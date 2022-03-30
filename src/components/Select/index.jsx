import { useState } from 'react'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

const BasicSelect = ({ label, items, handleChange, initialValue }) => (
  <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id='demo-simple-select-label'>Age</InputLabel>
      <Select
        labelId='select-label'
        id='select'
        value={initialValue}
        label={label}
        onChange={handleChange}
      >
        {items.map((item) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
)

export default BasicSelect
