import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

const BasicSelect = ({ label, items, handleChange, value, disabled }) => (
  <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
      <Select
        labelId='select-label'
        id='select'
        value={value}
        label={label}
        onChange={handleChange}
        disabled={disabled}
      >
        {items.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
)

export default BasicSelect
