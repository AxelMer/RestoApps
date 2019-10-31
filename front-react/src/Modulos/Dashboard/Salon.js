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
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';



    

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
  
  const useStyles = makeStyles(theme =>({
    root: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
    },
    tableWrapper: {
      maxHeight: 600,
      width: '100%',
      overflow: 'auto',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
  export default function StickyHeadTable() {
    const classes = useStyles();
    const [page] = React.useState(0);
    const [rowsPerPage] = React.useState(1000);
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({
      estado: '',
      name: 'hai',
    });
  
  
    const handleChange = event => {
      setValues(oldValues => ({
        ...oldValues,
        [event.target.name]: event.target.value,
      }));
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
        <div className="salon">
            <Appheader/>
        <div> Administrador de Salon</div>
        </div>
      <Grid item xs={12} className="Botonera">
      <ButtonGroup fullWidth aria-label="full width outlined button group" variant="contained" color="primary" >
        <Button onClick={handleClickOpen}>Agregar Mesa</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Agregar Mesa </DialogTitle>
        <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Sillas"
            type="number"
            fullWidth
          />
            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="estado">Estado</InputLabel>
             <Select
               value={values.estado}
                onChange={handleChange}
                inputProps={{
                 name: 'estado',
                 id: 'estado',
                }}
                >
          <MenuItem value={10}>Libre</MenuItem>
          <MenuItem value={20}>Ocupada</MenuItem>
          <MenuItem value={30}>Reservada</MenuItem>
        </Select>
      </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
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