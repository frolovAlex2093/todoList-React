import { Box } from '@mui/material'
import React from 'react'

export const Loader: React.FC = () => {
  return (
    <Box display='flex' justifyContent='center'><Box className="lds-dual-ring"></Box></Box>
  )
}
