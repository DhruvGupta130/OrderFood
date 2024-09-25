import React from 'react'
import { MenuTables } from './MenuTables'
import { Box } from '@mui/material'

export const Menu = () => {
  return (
    <div>
      <Box className='px-3 py-2'>
        <MenuTables/>
      </Box>
    </div>
  )
}
