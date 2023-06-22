import React, {useEffect, useState} from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


interface ISavedTripsProps {
  isLoading: boolean;
  error: null | any
  successful: boolean;
  data: any[];
  handleOpenTrip: (tripId: string) => void;

}

const SavedTripsList = ({data, handleOpenTrip}:ISavedTripsProps ) => {

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Saved list table">
          <TableHead>
            <TableRow>
               <TableCell>No</TableCell>
               <TableCell>Actions</TableCell>
               <TableCell>Date Created</TableCell>
               <TableCell>Take Off Place/Origin</TableCell>
               <TableCell>Start Date</TableCell>
               <TableCell>End Date</TableCell>
               <TableCell>No.of Days for trip</TableCell>               
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.trip}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Button id={row.trip} onClick={() => handleOpenTrip(row.trip)}>open</Button>                  
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell>{row.origin.details.name}</TableCell>
                <TableCell>{row.origin.startDate}</TableCell>
                <TableCell>{row.origin.endDate}</TableCell>
                <TableCell>{row.origin.numberOfDays}</TableCell>                
              </TableRow>
            ))}

          </TableBody>

        </Table>
      </TableContainer>
      
     
      
    </Box>
  )
}

export default SavedTripsList