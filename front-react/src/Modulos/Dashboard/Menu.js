import React from 'react';
import '../../App.css';
import Appheader from '../../componentes/appHeader';
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
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import DialogActions from '@material-ui/core/DialogActions';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
    
const columns = [
    { id: 'mercaderia', label: 'MERCADERIA', minWidth: 100 },
    { id: 'precio', label: 'PRECIO UNITARIO',minWidth: 100 },
    { id: 'tipo', label: 'TIPO',minWidth: 120,},
  ];
  
  function createData(mercaderia, precio, tipo, ) {
    return { mercaderia, precio, tipo };
  }
  
  const rows = [
    createData('Gaseosa linea coca - 500ml', "$70", "Bebida"),
    createData('Agua Mineral Glaciar - 500ml', "$50", "Bebida"),
    createData("Ensalada Completa", "$200", "Ensalada" ),
    createData("Ensalada Griega", "$260", "Ensalada" ),
    createData("Ensalada de pimientos", "$270", "Ensalada" ),
    createData("Ensalada de Salmón", "$300", "Ensalada" ),
    createData("Empanada", "$50", "Entrada" ),
    createData("Papas rusticas", "$90", "Entrada" ),
    createData("Croquetas de Queso", "$100", "Entrada" ),
    createData("Lasagna de verdura y ricota", "$290", "Pastas y salsas" ),
    createData("Espaguetti", "$220", "Pastas y salsas" ),
    createData("Noquis", "$230", "Pastas y salsas" ),
    createData("Pasta rellena", "$250", "Pastas y salsas" ),
    createData("Salsa filleto", "$50", "Pastas y salsas" ),
    createData("Salsa rosa", "$60", "Pastas y salsas" ),
    createData("Salsa blanca", "$60", "Pastas y salsas" ),
    createData("Milanesa de ternera con guarnicion", "$240", "Carnes y Minutas" ),
    createData("Milanesa de pollo con guarnicion", "$220", "Carnes y Minutas" ),
    createData("Milanesa maryland con guarnicion", "$290", "Carnes y Minutas" ),
    createData("Pechuga de pollo al roquefort con guarnición", "$290", "Carnes y Minutas" ),
    createData("Lomo al champignon con guarnición", "$300", "Carnes y Minutas" ),
    createData("Pure de papa o zapallo", "$80", "Guarnicion" ),
    createData("papas fritas", "$80", "Guarnicion" ),
    createData("Papas noisette ", "$80", "Guarnicion" ),
    createData("Pizza de muzarrella", "$220", "Pizzas" ),
    createData("Pizza de fuggazzeta", "$250", "Pizzas" ),
    createData("Pizza de Napolitana", "$250", "Pizzas" ),
    createData("Pizza de Jamón y Morrones", "$270", "Pizzas" ),
  ];
  
  const useStyles = makeStyles(theme =>({
    root: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
    },
    tableWrapper: {
      maxHeight: 600,
      overflow: 'auto',
      width: '100%',
    },
    input: {
      paddingLeft: '20px',
      color: 'white',
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
      tipo: '',
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
        <div className="menu">
            <Appheader/>
            <div> Administrador de Menu</div>
        </div>
      <Grid item xs={12} className="Botonera">
      <ButtonGroup fullWidth aria-label="full width outlined button group" variant="contained" color="primary" >
        <Button>Ver cocina</Button>
        <Button onClick={handleClickOpen}>Agregar Producto</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Agregar Producto a Base de Datos </DialogTitle>
        <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Producto"
            type="text"
            fullWidth
          />
            <TextField
              margin="dense"
              id="Precio"
              label="Precio"
              type="number"
            />
            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="tipo">Tipo</InputLabel>
             <Select
               value={values.tipo}
                onChange={handleChange}
                inputProps={{
                 name: 'tipo',
                 id: 'Tipo',
                }}
                >
          <MenuItem value={10}>Bebida</MenuItem>
          <MenuItem value={20}>Comida</MenuItem>
          <MenuItem value={30}>Postre</MenuItem>
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
        <InputBase
        className={classes.input}
        style={{height: 40, background:'white', borderWidth: 1, color : "black" }}
        placeholder= "Buscar..."
        inputProps={{ 'aria-label': 'search google ' ,}} 
      />
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.precio}>
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