import React from 'react';

import { Box } from '@mui/material';

export const Loader: React.FC = () => (
    <Box display='flex' justifyContent='center'>
      <Box className='lds-dual-ring' />
    </Box>
  );
