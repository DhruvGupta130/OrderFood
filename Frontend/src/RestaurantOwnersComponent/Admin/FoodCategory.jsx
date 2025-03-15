import React from 'react'
import { FoodCategoryTables } from './FoodCategoryTables'
import { Box } from '@mui/material'

export const FoodCategory = () => {
  return (
    <div>
        <Box className='px-3 py-2'>
          <FoodCategoryTables/>
        </Box>
    </div>
  )
}
