import React, { Component } from 'react';
import '../../App.css';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';


export default class TableAdmin extends Component {
    const columns = [
        { id: 'nombre', label: 'NOMBRE', minWidth: 100 },
        { id: 'perfil', label: 'PERFIL', minWidth: 100 },
        {
          id: 'antiguedad',
          label: 'ANTIGUEDAD (años)',
          minWidth: 120,
          align: 'right',
          format: value => value.toLocaleString(),
        },
        {
          id: 'cargo',
          label: 'CARGO',
          minWidth: 120,
          align: 'right',
          format: value => value.toLocaleString(),
        },
      ];
      
      
      function createData(nombre, perfil, antiguedad, cargo) {
        return { nombre, perfil, antiguedad, cargo };
      }

      
      const rows = [
        createData('Roberto Perez', 'ADMIN', 20, 'Gerente'),
        createData('Florencia Rodriguez', 'ADMIN', 20, 'Jefe'),
        createData('Emiliano Tomba', 'MOZO', 6, '1° Maitre'),
        createData('Mariano Morena', 'MOZO', 5, '2° Maitre'),
        createData('Lorena Santillan', 'MOZO',4, '3° Maitre'),
        createData('Rodrigo Lara', 'MOZO', 5, '3° Maitre'),
        createData('Gerardo Pincosa', 'MOZO', 2, '3° Maitre'),
        createData('Alejandro Aguilar', 'CAJA', 10, 'Asistente de Caja'),
        createData('Paula Tapa', 'CAJA', 10, 'Asistente de caja'),
        createData('Jose Causal', 'COCINA', 5, 'Ayudante de cocina'),
        createData('Jorge Añato', 'COCINA', 2, 'Ayudante de cocina'),
        createData('Nicolas Paso', 'COCINA', 3, 'Ayudante de cocina'),
        createData('Andres Zapata', 'COCINA', 7, 'Ayudante de cocina'),
        createData('Pedro Donato', 'COCINA', 6, 'Ayudante de cocina'),
        createData('Bruno Martinez', 'COCINA', 11,'Jefe de Cocina'),
      ];
      
      const useStyles = makeStyles(theme => ({
        root: {
          width: '100%',
        },
        tableWrapper: {
          maxHeight: 600,
          overflow: 'auto',
        },
      }));


      export default function StickyHeadTable() {
        const classes = useStyles();
        const [page] = React.useState(0);
        const [rowsPerPage] = React.useState(1000);
        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };  

render(){
    return(
        <div>
        <div className="cuenta">
        <Appheader/>
        <div> Administrador de cuentas</div>

    </div>
      <Grid item xs={12} className="Botonera">
      <ButtonGroup fullWidth aria-label="full width outlined button group" variant="contained" color="primary" >
        <Button onClick={handleClickOpen}>
        Nueva Cuenta
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title"> NUEVA CUENTA </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Ingrese los datos del personal autorizado.
              </DialogContentText>
              <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nombre"
              type="text"
              fullWidth
               />
              <TextField
              margin="dense"
              id="perfil"
              label="Perfil"
              type="text"
              fullWidth
               />
              <TextField
              margin="dense"
              id="antiguedad"
              label="Antiguedad"
              type="number"
              fullWidth
               />
              <TextField
              margin="dense"
              id="cargo"
              label="Cargo"
              type="text"
              fullWidth
               />
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
        <Button>Editar Cuenta</Button>
        <Button>Eliminar Cuenta</Button>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.perfil}>
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
      </div>


       );
    } 

}

