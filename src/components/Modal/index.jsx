import { Button } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import styles from './styles.module.scss'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const CustomModal = ({ title, children, isOpen, handleClose, submitModal }) => (
  <div>
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <Typography id='transition-modal-title' variant='h6' component='h2'>
            <div className={styles.header}>{title}</div>
          </Typography>
          {children}
          <Button
            onClick={submitModal}
            variant='contained'
            color='success'
            sx={{ marginTop: 2 }}
          >
            Add station
          </Button>
        </Box>
      </Fade>
    </Modal>
  </div>
)

export default CustomModal
