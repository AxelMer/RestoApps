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

export default class Cuentas extends  React.Component{
  constructor(props){
    super(props);
    this.state = {
      idUser:0,
      lista:[],
      name:'',
      user:'',
      password:'',
      tipo:'',
      open:false,
    }
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangeName  = this.handleChangeName.bind(this);
    this.handleChangePassword  = this.handleChangePassword.bind(this);
    this.handleChangeTipo = this.handleChangeTipo.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

componentDidMount(){
    this.DataUser() 
} 
//Los cambios de los inputs
handleChangeUser(event){
  this.setState({user: event.target.value})
}
handleChangeName(event){
  this.setState({name: event.target.value})
}
handleChangePassword(event){
  this.setState({password: event.target.value})
}
handleChangeTipo(event){
  this.setState({tipo:event.target.value})
}
//Configuracion del estado del Modal
openModal() {
  this.setState({ open: true });
}
closeModal() {
  this.setState({ open: false });
}

//tomamos los datos de una fila y lo colocamos en el modal para ser editado
editUserExits(data){
    //Editar un user existente
    this.setState({
      idUser: data.id,
      name: data.name,
      user: data.user,
      password: data.password,
      tipo: data.permiso,
      open:true
    })
 }

sendNetworkUpdate(){

  const formData = {
  id: this.state.idUser,
  name: this.state.name,
  user:this.state.user,
  password: this.state.password,
  tipo: this.state.tipo,
}

  axios.put('http://localhost:8000/User/',formData).then(response=>{

       if (response.data.success==true) {
         alert(response.data.message)
         // para cargar datos de nuevo
         this.DataUser()
         // para cerrar el modal
       }

   }).catch(error=>{
     alert("Error 456"+error)
   })

}

//Metodo para Crear Nuevo Usuario
// No funciona arreglar 
guardarDatos(e){
  e.preventDefault();
  
  const name = this.state.name
  const user = this.state.user
  const pass = this.state.password
  const tipo = this.state.tipo
 const users= {
  name: name,
  user: user,
  password: pass,
  tipo: tipo,
}
  axios.post('http://localhost:8000/User' , { users })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
}
//Llamamos a la Api para traer los datos
DataUser(){
  axios.get('http://localhost:8000/User')
  .then(response=>{
    this.setState({lista:response.data})
  }).catch(error=>{
    alert("Error "+error)
  })
}
//Metodo para Eliminar usuario
  deleteUser(){
   //Todo el codigo para eliminar un user de la tabla 
   
  }

 //Organiza la lista del json que traemos de la API
  renderList(){

    return this.state.lista.map((data)=>{
        return(
      <tr>
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{data.user}</td>
        <td>{data.password}</td>
        <td>{data.permiso}</td>
        <td>
        <Button
        size="small" 
        variant="contained"
        color="primary"
        onClick={()=>this.editUserExits(data)}
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
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Contraseña</th>
                        <th>Permiso</th>
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
            Nueva cuenta
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
                    Ingrese los datos del personal autorizado.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nombre"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChangeName}
                    fullWidth
                   />
                  <TextField
                    margin="dense"
                    id="user"
                    label="Usuario"
                    type="text"
                    value={this.state.user}
                    onChange={this.handleChangeUser}
                    fullWidth
                   />
                  <TextField
                    margin="dense"
                    id="password"
                    label="Contraseña"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChangePassword}
                    fullWidth
                   />
                  <Select
                    labelId="demo-simple-select-label"
                    id="tipo"
                    fullWidth
                    value={this.state.tipo}
                    onChange={this.handleChangeTipo}
                  >
                    <MenuItem value={'admin'}>Administrador</MenuItem>
                    <MenuItem value={'mozo'}>Mozo</MenuItem>
                    <MenuItem value={'cocina'}>Cocina</MenuItem>
                  </Select>
               </DialogContent>
               <DialogActions>
               <Button onClick={this.closeModal} color="primary">
            Cancel
          </Button>
          <Button onClick={this.sendNetworkUpdate} color="primary">
            Guardar
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