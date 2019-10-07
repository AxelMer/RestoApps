import React from 'react';
import Appheader from '../../componentes/appHeader';
import '../../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
    

const columns = [
    { id: 'mesas', label: 'MESAS', minWidth: 100 },
    { id: 'sillas', label: 'SILLAS',minWidth: 100 },
    { id: 'estado', label: 'ESTADO',minWidth: 120,},
  ];
  
  function createData(mesas, sillas, estado, ) {
    return { mesas, sillas, estado };
  }
  
  const rows = [
    createData('MESA 1', 20, "LIBRE"),
    createData('MESA 2', 20, "LIBRE"),
    createData('MESA 3', 6, "LIBRE" ),
    createData('MESA 4', 5, "LIBRE"),
    createData('MESA 5', 4, "LIBRE"),
    createData('MESA 6',  5, "LIBRE"),
  ];
  
  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    tableWrapper: {
      maxHeight: 600,
      overflow: 'auto',
    },
  });
  
  export default function StickyHeadTable() {
    const classes = useStyles();
    const [page] = React.useState(0);
    const [rowsPerPage] = React.useState(1000);

    return (
      <div>
        <div className="salon">
            <Appheader/>
        <div> Administrador de Salon</div>
        </div>
      <Grid item xs={12} className="Botonera">
      <ButtonGroup fullWidth aria-label="full width outlined button group" variant="contained" color="primary" >
        <Button>Agregar Mesa</Button>
        <Button>Eliminar</Button>
      </ButtonGroup>
    </Grid>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.sillas}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
      </div>
      </Paper>
      <Button  variant="contained" color="secondary" className={classes.button}>
        Ver Salon
      </Button>
    </div>
    );
  }