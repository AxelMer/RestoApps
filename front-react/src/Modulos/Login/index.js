import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {FormGroup, Col} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import  Avatar from '@material-ui/core/Avatar';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

export default class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      idUser:'',
      usuario:'',
      password:'',
      credencial:'',
    }
    this.cambiarUsuario = this.cambiarUsuario.bind(this);
    this.cambiarPassword  = this.cambiarPassword.bind(this);
  }
  cambiarUsuario(event){
    this.setState({usuario: event.target.value})
  }
  cambiarPassword(event){
    this.setState({password: event.target.value})
  }
sendLogin = (e)=>{
  const formData = new FormData()
        formData.append('usuario',this.state.usuario)
        formData.append('password',this.state.password)

  axios.post('http://localhost:8000/api/auth/login', formData)
  .then( response =>{
      localStorage.setItem('access_token', JSON.stringify(response.data));
      console.log(localStorage)
      this.props.history.push('/home');
  }).catch(error=>{
      alert("No se puede conectar con el servidor" + error)
  })
}

render() {
  return (
    <React.Fragment>
    <CssBaseline />
    <form>
       <div>
         <Grid container justify="center" alignItems="center">
           <Avatar container justify="center" alignItems="center">
             <FastfoodIcon />
           </Avatar>
         </Grid>
         <Typography component="h1" variant="h5">
           Ingresa a Restoapp
         </Typography>
       </div>
       <div className="container" id="modal-body">
         <div className="card" id="card">
           <div className="card-body">
              <FormGroup row>    
               <Col sm={10}>           
                 <TextField
                 variant="outlined"
                 margin="normal"
                 required
                 fullWidth
                 id="cuenta"
                 label="Cuenta de usuario"
                 name="usuario"
                 value={this.state.usuario} 
                 onChange={this.cambiarUsuario} 
                 autoFocus
                 />
               </Col> 
               </FormGroup>
               <FormGroup row>
               <Col sm={10}> 
                 <TextField
                 variant="outlined"
                 margin="normal"
                 required
                 fullWidth
                 name="password"
                 label="Contraseña"
                 type="password"
                 id="password"
                 value={this.state.password} 
                 onChange={this.cambiarPassword} 
                />
               </Col>
               </FormGroup>
               <FormGroup>
               <Col sm={10}>
                 <Button
                 required
                 fullWidth
                 variant="contained"
                 color="primary"
                 onClick={this.sendLogin}
                 >
                 Ingresar
                 </Button>
               </Col>
               </FormGroup>
           </div>
         </div>
       </div>      
     </form>
   </React.Fragment>
  );
}
}

