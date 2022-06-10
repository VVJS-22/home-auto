import React from 'react'
import { Stack, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab'


const Item = ({name, funcOn, loadingOn, loadStatus, loadingOff, funcOff, on}) => {

  const statusColor = on ? "#00ff00" : "#ff0000"

  return (
    <Stack direction='row' sx={{
        justifyContent: "space-between",
        alignItems: 'center',
        padding: '1rem'
      }}>
        <Stack direction='row'
        spacing={2}
        sx={{
            alignItems: 'center'
        }}
        >
        <Typography variant='subtitle1'>{name}</Typography>
        <Box 
        sx={{
            borderRadius: '50%',
            width: '16px',
            height: '16px',
            background: statusColor
        }}
        />
        </Stack>

        <Stack spacing={2} direction='row'>
            <LoadingButton
            variant="contained"
            onClick={funcOn}
            loading={loadingOff}
            >
                On
            </LoadingButton>
            <LoadingButton
            variant="contained"
            onClick={funcOff}
            loading={loadingOn}
            color='error'>Off</LoadingButton> 
        </Stack>
    </Stack>
  )
}

export default Item