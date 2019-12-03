import React from 'react';
import '../../App.css';
import Appheader from '../../componentes/appHeader';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AddIcon from '@material-ui/icons/Add';
import { Table, Typography } from '@material-ui/core';
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
      lista:[],
      idUser:'',
      nombre:'',
      usuario:'',
      password:'',
      credencial:'',
      open:false,
      edit:false,
    }
      this.handleChangeId = this.handleChangeId.bind(this);
      this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
      this.handleChangeNombre = this.handleChangeNombre.bind(this);
      this.handleChangePassword  = this.handleChangePassword.bind(this);
      this.handleChangeCredencial = this.handleChangeCredencial.bind(this);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.changeEdit = this.changeEdit.bind(this);
  }
//Metodo para cargar despues que un componente se invoque
UNSAFE_componentWillMount(){
  if(localStorage.length === 0){
    alert("Area Restringida");
      this.props.history.push('/');
  }else{
    setTimeout(
      function() {
        this.loadData()
      }
      .bind(this),
      100
  );
  }
}
/*componentDidMount(){
  setTimeout(
    function() {
      this.loadData()
    }
    .bind(this),
    100
);
}*/
  //
  handleChangeUsuario(event){
    this.setState({usuario: event.target.value})
  }
  handleChangeNombre(event){
    this.setState({nombre: event.target.value})
  }
  handleChangePassword(event){
    this.setState({password: event.target.value})
  }
  handleChangeCredencial(event){
    this.setState({credencial:event.target.value})
  }
  handleChangeId(event){
    this.setState({idUser:event.target.value})
  }
  //Funciones de apertura y cierre del modal
  openModal() {
    this.setState({ 
      open: true
     });
     
  }
  closeModal() {
    this.setState({ 
      open: false,
      edit:false,
      idUser:'',
      nombre:'',
      usuario:'',
      password:'',
      credencial:'',
    });
  }
  changeEdit() {
    this.setState({ edit: true });
  }

//Metodo para traer la los datos
  loadData = (e) =>{
    const token = localStorage.getItem("access_token");
    axios.get('http://localhost:8000/api/auth/user',{
      headers: {
        Authorization: 'Bearer '+token,
        'Content-Type': 'application/json'
      }
    })
    .then(response=>{
      this.setState({lista:response.data})
    }).catch(error=>{
      this.setState({
        error:true,
        message:'El servidor no responde '
      })

    })
  }
///Metodos para Agregar nuevo Usuario  ****FUNCIONANDO****
  addNewUser = (e) =>{
    e.preventDefault();
      const baseUrl = 'http://localhost:8000/';
      const token = localStorage.getItem("access_token");
      const formData = new FormData()
        formData.append('nombre',this.state.nombre)
        formData.append('usuario',this.state.usuario)
        formData.append('password',this.state.password)
        formData.append('credencial',this.state.credencial)

        axios.post(baseUrl+'/api/auth/user',formData,{
          headers: {
            Authorization: 'Bearer '+token,
            'Content-Type': 'application/json',
          }
        }).then(response=>{
            if (response.data.success === true) {
              alert(response.data.message)
              // cargar datos de nuevo
              this.loadData();
              this.setState({
                idUser:'',
                nombre:'',
                usuario:'',
                password:'',
                credencial:'',
                open: false
              });
            }
        }).catch(error=>{
          alert("Error "+error)
        })

  }

//Metodos Para Editar usuario existente ****FUNCIONANDO****
  editUser=(data)=>{
      this.setState({
        idUser: data.id,
        nombre: data.nombre,
        usuario: data.usuario,
        credencial: data.credencial,
        open:true,
        edit:true
      })
  }
  sendUpdate=(e)=>{
  const token = localStorage.getItem("access_token");
  const formData = {
  id: this.state.idUser,
  nombre: this.state.nombre,
  usuario:this.state.usuario,
  password: this.state.password,
  credencial: this.state.credencial,
  }
  const idU = this.state.idUser;
  axios.put('http://localhost:8000/api/auth/user/'+idU,formData,{
    headers: {
      Authorization: 'Bearer '+token,
      'Content-Type': 'application/json'
    }
  })
    .then(response=>{
        if (response.data.success===true) {
          alert(response.data.message)
          // para cargar datos de nuevo
          this.loadData();
          this.setState({
            open: false,
            idUser:'',
            nombre:'',
            usuario:'',
            password:'',
            credencial:'',
          })
        }
      }).catch(error=>{
        alert("Error 456"+error)
      })

  }

//Metodos para Eliminar usuario **FUNCIONA CON PROBLEMAS** // Tenes que clickear dos veces
deleteUser(data){ 
  // id seleccionado para eliminar
  this.setState({ idUser:data.id }, () =>{
  if(this.state.idUser){
    this.sendDelete()
  }else{
    alert("No se puede borrar");
  }
  })
}
sendDelete(){
  const token = localStorage.getItem("access_token");
  const baseUrl = 'http://localhost:8000/';
    axios.delete(baseUrl+'api/auth/user/'+this.state.idUser,{
      headers: {
        Authorization: 'Bearer '+token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        this.loadData();
      })
      .catch(error=>{
        alert("Error 456"+error)
      })
}

 //Organizamos los datos en una tabla
renderList(){
    return this.state.lista.map((data)=>{
        return(
      <tr key={data.id}> 
        <td>{data.id}</td>
        <td>{data.nombre}</td>
        <td>{data.usuario}</td>
        <td>{data.credencial}</td>
        <td>
        <Button
          size="small" 
          variant="contained"
          color="primary"
          value={data.id}
          onClick={()=>this.editUser(data)}
        >
      <EditRoundedIcon/>Edit
      </Button>
        <Button
        size="small" 
        variant="contained"
        color="secondary"
        onClick={()=>this.deleteUser(data)}
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
                {this.state.error === true ?
                  <Table className="table" size="small" aria-label="a dense table" >
                    <thead>
                      <tr>
                      <Typography className="message" variant='overline'  disabled>{this.state.message}</Typography>
                      </tr>
                    </thead>
                  </Table>
                  :
                  <Table className="table" size="small" aria-label="a dense table" >
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Permiso</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                        <tbody>
                        {this.renderList()}
                        </tbody>
                  </Table>
                }
                  
              </div>
              <div>
                {this.state.error === true ?
                  <Button size="small" variant="contained" color="primary" onClick={this.openModal} disabled>
                    <AddIcon/>
                    Nueva cuenta
                  </Button>               
                  :
                  <Button size="small" variant="contained" color="primary" onClick={this.openModal} >
                    <AddIcon/>
                    Nueva cuenta
                  </Button>   
                }
              <form>
                <Dialog open={this.state.open} onClose={this.closeModal}  disableBackdropClick aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                  {this.state.edit ?  
                    <DialogContent>
                      <DialogTitle id="alert-dialog-title">Modificar datos</DialogTitle>
                        <DialogContentText id="alert-dialog-description">
                            Actualizar datos.
                        </DialogContentText>
                        <DialogContent>
                                <TextField 
                                  autoFocus 
                                  margin="dense" 
                                  id="id" 
                                  label="id" 
                                  type="text" 
                                  value={this.state.idUser} 
                                  onChange={this.handleChangeId} 
                                  fullWidth
                                  disabled />
                                <TextField 
                                  autoFocus 
                                  margin="dense" 
                                  id="nombre" 
                                  label="Nombre" 
                                  type="text" 
                                  value={this.state.nombre} 
                                  onChange={this.handleChangeNombre} 
                                  fullWidth />
                                <TextField
                                  margin="dense"
                                  id="usuario"
                                  label="Usuario"
                                  type="text"
                                  value={this.state.usuario}
                                  onChange={this.handleChangeUsuario}
                                  fullWidth />
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="credencial"
                                  fullWidth
                                  value={this.state.credencial}
                                  onChange={this.handleChangeCredencial}
                                >
                                  <MenuItem value={'administrador'}>Administrador</MenuItem>
                                  <MenuItem value={'mozo'}>Mozo</MenuItem>
                                </Select>
                                <DialogContent>
                                <TextField
                                  margin="dense"
                                  id="password"
                                  label="Nueva Contraseña"
                                  type="password"
                                  value={this.state.password}
                                  onChange={this.handleChangePassword}
                                  fullWidth />
                                </DialogContent>
                        </DialogContent>
                        <DialogActions>
                              <Button onClick={this.closeModal} color="primary">
                                Cancel
                              </Button>
                              <Button onClick={this.sendUpdate} color="primary">
                                Actualizar
                              </Button>
                            </DialogActions>
                    </DialogContent>
                  :  
                    <DialogContent>
                        <DialogTitle id="alert-dialog-title">Crear Nuevo Usuario</DialogTitle>
                          <DialogContentText id="alert-dialog-description">
                            <DialogContent>
                              Ingrese los datos del personal autorizado.
                            </DialogContent>
                            <DialogContent>
                                <TextField 
                                  autoFocus 
                                  margin="dense" 
                                  id="nombre" 
                                  label="Nombre" 
                                  type="text" 
                                  value={this.state.nombre} 
                                  onChange={this.handleChangeNombre} 
                                  fullWidth />
                                <TextField
                                  margin="dense"
                                  id="usuario"
                                  label="Usuario"
                                  type="text"
                                  value={this.state.usuario}
                                  onChange={this.handleChangeUsuario}
                                  fullWidth />
                                <TextField
                                  margin="dense"
                                  id="password"
                                  label="Contraseña"
                                  type="password"
                                  value={this.state.password}
                                  onChange={this.handleChangePassword}
                                  fullWidth />
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="credencial"
                                  fullWidth
                                  value={this.state.credencial}
                                  onChange={this.handleChangeCredencial}
                                >
                                  <MenuItem value={'administrador'}>Administrador</MenuItem>
                                  <MenuItem value={'mozo'}>Mozo</MenuItem>
                                </Select>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={this.closeModal} color="primary">
                                Cancel
                              </Button>
                              <Button onClick={this.addNewUser} color="primary">
                                Guardar
                              </Button>
                            </DialogActions>
                          </DialogContentText>
                    </DialogContent>
                  }
                </Dialog>
              </form>
            </div>
            </div>
      </div>
  );
  }
}