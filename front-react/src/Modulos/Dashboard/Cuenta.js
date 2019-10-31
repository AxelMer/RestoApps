import React, { useState, useEffect  } from 'react';
import '../../App.css';
import Appheader from '../../componentes/appHeader';
import axios from 'axios';


  export default function ListaUsuarios(){
    const [User, setUser] = useState({hits:[]});
    useEffect(async () => {
      const result = await axios(
        'http://localhost:8000/User',
      );
      setUser(result.User);
    });
    return(
      <div>
            <div className="cuenta">
            <Appheader/>
            <div> Administrador de cuentas</div>
            </div>
            <table class="table table-bordered order-table ">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Descripcion</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody id="bodytable">
                   {User.map(item =>(
                      <tr>
                       <td>{item.id}</td>
                       <td>{item.name}</td>
                       <td>{item.email}</td>
                      </tr>
                   )
                   )}
              </tbody>
            </table>

      </div>
    )
  } 
  /*const columns = [
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
  ];*/
   /*   function createData(nombre, perfil, antiguedad, cargo) {
        const [User, setUser] = useState();
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
            <div className="cuenta">
            <Appheader/>
            <div> Administrador de cuentas</div>

        </div>
          <Grid item xs={12} className="Botonera">
          <ButtonGroup fullWidth aria-label="full width outlined button group" variant="contained" color="primary" >
            <Button>Nueva Cuenta</Button>
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
*/