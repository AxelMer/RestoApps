import React from 'react';
import '../../App.css';
import Appheader from '../../componentes/appHeader';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AddIcon from '@material-ui/icons/Add';
import { Table } from 'reactstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default class Menu extends  React.Component{
  constructor(props){
    super(props);
    this.state = {
      idUser:0,
      lista:[],
      articulo:'',
      precio:'',
      cantidad:'',
      open:false,
    }
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangeArticulo  = this.handleChangeArticulo.bind(this);
    this.handleChangePrecio  = this.handleChangePrecio.bind(this);
    this.handleChangeCantidad = this.handleChangeCantidad.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
//Los cambios de los inputs
handleChangeUser(event){
  this.setState({user: event.target.value})
}
handleChangeArticulo(event){
  this.setState({articulo: event.target.value})
}
handleChangePrecio(event){
  this.setState({precio: event.target.value})
}
handleChangeCantidad(event){
  this.setState({cantidad:event.target.value})
}


//Configuracion del estado del Modal
openModal() {
  this.setState({ open: true });
}
closeModal() {
  this.setState({ open: false });
}

//Metodo para editar usuario
  editUserExits(){
    //Editar un user existente
  }
//Metodo para Crear Nuevo Usuario
guardarDatos(e){
  e.preventDefault();
  const formData = {
    user: this.state.user,
    articulo: this.state.articulo,
    precio: this.state.precio,
    cantidad: this.state.cantidad,
  }
  axios.post('http://localhost:8000/User/Store',formData).then( res=>console.log(res.data) 
).catch(error=>{
     alert("Error 456"+error)
   })

}

//Metodo para Eliminar usuario
  deleteUser(){
   //Todo el codigo para eliminar un user de la tabla 
  }

  componentDidMount(){

    axios.get('http://localhost:8000/User')
    .then(response=>{
      this.setState({lista:response.data})
    }).catch(error=>{
      alert("Error "+error)
    })
 }
 //Organiza la lista del json que traemos de la API
  renderList(){
    return this.state.lista.map((data)=>{
        return(
      <tr>
        <td>{data.id}</td>
        <td>{data.articulo}</td>        
        <td>{data.precio}</td>
        <td>{data.cantidad}</td>
        <td>
        <Button
        size="small" 
        variant="contained"
        color="primary"
      >
      <EditRoundedIcon/>Edit
      </Button>
        <Button
        size="small" 
        variant="contained"
        color="secondary"
      >
      <DeleteIcon/>
        Delete
      </Button>
        </td>
      </tr>
    )
  })
  }
 
render() {
  
  return (
      <div>
          <Appheader/>
            <div>
              <div> 
                <h1>Productos</h1>
              <hr/>
              </div>
              <div>
                  <Table className="table" size="sm">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Articulo</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderList()}
                    </tbody>
                </Table>
              </div>
              <div>
        <Button
            size="small" 
            variant="contained"
            color="primary"
            onClick={this.openModal}
        >
          <AddIcon/>
            Agregar
        </Button>
      <Dialog
        open={this.state.open}
        onClose={this.closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Agregar Nuevo Producto</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <DialogContent>
                  <DialogContentText>
                    Ingrese los datos. 
                  </DialogContentText>
                  <TextField
                  autoFocus
                  margin="dense"
                  id="articulo"
                  label="Articulo"
                  type="text"
                  value={this.state.articulo}
                  onChange={this.handleChangeArticulo}
                  fullWidth
                   />
                  <TextField
                  margin="dense"
                  id="precio"
                  label="Precio"
                  type="number"
                  value={this.state.precio}
                  onChange={this.handleChangePrecio}
                  fullWidth
                   />
                  <Select
                    labelId="demo-simple-select-label"
                    id="tipo"
                    fullWidth
                    value={this.state.tipo}
                    onChange={this.handleChangeTipo}
                  >
                    <MenuItem value={'admin'}>Bebida</MenuItem>
                    <MenuItem value={'mozo'}>Comida</MenuItem>
                    <MenuItem value={'cocina'}>Postre</MenuItem>
                  </Select>
               </DialogContent>
               <DialogActions>
               <Button onClick={this.closeModal} color="primary">
            Cancel
          </Button>
          <Button onClick={this.guardarDatos} color="primary">
            Aceptar
          </Button>
        </DialogActions>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         
        </DialogActions>
      </Dialog>
    </div>
      </div>
    </div>
  );
  }
}