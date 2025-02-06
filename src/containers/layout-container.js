import { Container } from '@mui/material'
import React from 'react'

export default function LayoutLontainer({ children }) {
  return (
    <Container sx={(theme) => ({ 
        // height: theme.spacing(10),
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            // p: 0
        },
        [theme.breakpoints.down('lg')]: {
          maxWidth: '1200px',
      },
        [theme.breakpoints.up('lg')]: {
            maxWidth: '1536px',
            pl: 6,
            pr: 6
        }
    })}>
        {children}
    </Container>
  )
}
