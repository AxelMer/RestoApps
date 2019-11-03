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

export default class Salon extends  React.Component{
  constructor(props){
    super(props);
    this.state = {
      idUser:0,
      lista:[],
      capacidad:'',
      estado:'',
      open:false,
    }
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangeCapacidad  = this.handleChangeCapacidad.bind(this);
    this.handleChangeEstado  = this.handleChangeEstado.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
//Los cambios de los inputs
handleChangeUser(event){
  this.setState({user: event.target.value})
}
handleChangeCapacidad(event){
  this.setState({capacidad: event.target.value})
}
handleChangeEstado(event){
  this.setState({estado: event.target.value})
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
    capacidad: this.state.capacidad,
    user: this.state.user,
    estado: this.state.estado,
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
        <td>{data.user}</td>
        <td>{data.capacidad}</td>
        <td>{data.estado}</td>
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
                <h1>Administrador de cuenta</h1>
              <hr/>
              </div>
              <div>
                  <Table className="table" size="sm">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Mesa</th>
                        <th>Capacidad</th>
                        <th>Estado</th>
                        <th></th>
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
            Agregar Nueva Mesa
        </Button>
      <Dialog
        open={this.state.open}
        onClose={this.closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Crear Nuevo Usuario</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <DialogContent>
                  <DialogContentText>
                    Ingrese datos
                  </DialogContentText>
                  <TextField
                  autoFocus
                  margin="dense"
                  id="cantidad"
                  label="Sillas"
                  type="number"
                  value={this.state.cantidad}
                  onChange={this.handleChangeCantidad}
                  fullWidth
                   />
                  <Select
                    labelId="demo-simple-select-label"
                    id="tipo"
                    fullWidth
                    value={this.state.estado}
                    onChange={this.handleChangeEstado}
                  >
                    <MenuItem value={'libre'}>Libre</MenuItem>
                    <MenuItem value={'ocupada'}>Ocupada</MenuItem>
                    <MenuItem value={'reservada'}>Reservada</MenuItem>
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