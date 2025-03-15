import { Grid2, Typography, Paper, Divider, Box } from '@mui/material';
import React from 'react';
import { OrderTables } from './OrderTables';
import { MenuTables } from './MenuTables';

export const Dashboard = () => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        Dashboard
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 item size={{xs:12, md:5}}>
          <Paper elevation={3} sx={styles.card}>
            <Typography variant="h6" sx={styles.title}>
              Menu
            </Typography>
            <Divider sx={styles.divider} />
            <MenuTables/>
          </Paper>
        </Grid2>
        <Grid2 item size={{xs:12, md:7}}>
          <Paper elevation={3} sx={styles.card}>
            <Typography variant="h6" sx={styles.title}>
              Orders
            </Typography>
            <Divider sx={styles.divider} />
            <OrderTables/>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

const styles = {
  container: {
    padding: '20px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 2,
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%', // Ensures full width
  },
  divider: {
    margin: '8px 0',
  },
};
