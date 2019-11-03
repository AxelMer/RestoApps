import React, { Component  } from 'react';
import '../../App.css';
import Appheader from '../../componentes/appHeader';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {  Table  } from 'reactstrap';

export default class Cuentas extends  Component{
  constructor(props){
    super(props);
    this.state = {
      lista:[],
      user:'',
      email:'',
      password:'',
      open:false,
    }
    /*this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangeEmail  = this.handleChangeEmail.bind(this);
    this.handleChangePassword  = this.handleChangePassword.bind(this);
   */
  }
/*
//crear los handler 
handleChangeUser(){
  this.setState({user: event.target.value})
}
handleChangeEmail(){
  this.setState({email: event.target.value})
}
handleChangePassword(){
  this.setState({password: event.target.value})
}
handleClickOpen (){
  this.setState({Open: true})
};
*/
//Metodo para editar usuario
  editUserExits(){
    //Editar un user existente
  }
//Metodo para Crear Nuevo Usuario
  createNewUser(){
    //Todo el codigo para subir datos
 
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
        <td>{data.name}</td>
        <td>{data.email}</td>
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
                        <th>usuario</th>
                        <th>Email</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderList()}
                    </tbody>
                </Table>
              </div>
            
              <Button
                size="small" 
                variant="contained"
                color="primary"
               
              >
              <AddIcon/>
                Nueva cuenta
              </Button>
    </div>
    </div>
  );
}
}