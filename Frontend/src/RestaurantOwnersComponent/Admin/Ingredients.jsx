import React from 'react'
import { IngredientTables } from './IngredientTables'
import { Grid2 } from '@mui/material'
import { IngredientCategoryTables } from './IngredientCategoryTables'

export const Ingredients = () => {
  return (
    <div>
        <Grid2 container spacing={2}>
            <Grid2 size={{xs:12, lg:8}} className='pl-3 py-2'>
                <IngredientTables/>
            </Grid2>
            <Grid2 size={{xs:12, lg:4}} className='pr-3 py-2'>
                <IngredientCategoryTables/>
            </Grid2>
        </Grid2>
    </div>
  )
}
