import React, { Component } from 'react';
import '../../App.css';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import {FormGroup, Col} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import  Avatar from '@material-ui/core/Avatar';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
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

  axios.post('http://localhost:8000/api/auth/login', formData).then( response => {
    const token = response.data.access_token;
    this.setState({credencial: response.data.perfil});
      localStorage.clear();
      console.log(token)
      localStorage.setItem('access_token', token);
      if(this.state.credencial.length && localStorage.length){
          this.state.credencial.forEach(data => {
            const verify = data.credencial;
            if(verify === 'administrador'){
              this.props.history.push('/home');
            }else{
              this.props.history.push('/salon');
            }
          });
      }
  }).catch(error=>{
      alert("No se puede conectar con el servidor" + error)
  })
}

render() {
  return (
    <div className="login">
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

       <div className="input-area">
       <Col sm={12}>           
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
              <Col sm={12}> 
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
       </div>

       <Col sm={12}>
                <Button
                type="submit"
                required
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.sendLogin}
                >
                Ingresar
                </Button>
              </Col>
    </div>      
  );
}
}
