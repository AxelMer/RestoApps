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
      idUser:'',
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
  //
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
  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }

//Metodo para cargar despues que un componente se invoque
componentDidMount(){
  //Hacemos un GET a la Api de laravel y lo devolvemos
  axios.get('http://localhost:8000/User')
  .then(response=>{
    this.setState({lista:response.data})
  }).catch(error=>{
    alert("Error "+error)
  })
}

///Metodos para Agregar nuevo Usuario
addNewUser=(e)=>{
  e.preventDefault();
  //tomamos los datos de los State
  const formData = {
    name: this.state.name,
    user: this.state.user,
    password: this.state.password,
    tipo: this.state.tipo,
  };
  //Hacemos un POST a la Api para crear un nuevo usuario

  const url = 'http://localhost:8000/User/';

  axios.post(url,{formData, withCredentials:true})
    .then( res=> {
      console.log(res);
      console.log(res.data);
    })
    .catch(error=>{
      console.log(error);
      console.log(error.res);
    alert("Error 456"+error)
    })  
}

//Metodo Para Editar usuario existente
editUser=(data)=>{
    this.setState({
      idUser: data.id,
      name: data.name,
      user: data.user,
      password: data.password,
      tipo: data.permiso,
      open:true
    })
}

//Enviamos los datos por medio del PUT
sendUpdate=(e)=>{

const formData = {
id: this.state.idUser,
name: this.state.name,
user:this.state.user,
password: this.state.password,
tipo: this.state.tipo,
}
const idU = this.state.idUser 
axios.put('http://localhost:8000/User/', idU, formData).then(response=>{

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

//Metodo para Eliminar usuario
deleteUser=(e)=>{
    //Todo el codigo para eliminar un user de la tabla 
    e.preventDefault();
    const formData = {idUser: this.state.idUser};

    axios.delete(`http://localhost:8000/User/${formData}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error=>{
        console.log(error);
        console.log(error.data);
        alert("Error 456"+error)
      })
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
          onClick={()=>this.editUser(data)}
        >
      <EditRoundedIcon/>Edit
      </Button>
        <Button
        size="small" 
        variant="contained"
        color="secondary"
        value={this.state.idUser}
        onClick={this.deleteUser}
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
                        <th>Tipo</th>
                        <th>Opciones</th>
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
            Nueva cuenta
        </Button>

        <form >
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
                 {this.state.open ?
                  <Button onClick={this.sendUpdate} color="primary">
                  Actualizar
                </Button>
                :
                <Button onClick={this.addNewUser} color="primary">
                Guardar
              </Button>
                }
                </DialogActions>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         
        </DialogActions>
      </Dialog>
      </form>
    </div>
      </div>
    </div>
  );
  }
}