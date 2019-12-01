import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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
sendLogin(){
  axios.post('http://localhost:8000/api/auth/login')
  .then(response=>{
    localStorage.setItem('token', JSON.stringify(response.data));
    this.props.history.push('/home');
  }).catch(error=>{
    alert("No se puede conectar con el servidor" + error)
  })
}

render() {
  return (
    <React.Fragment>
   <CssBaseline />
    <Container maxWidth="xs">
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
      <form>
          <div className="p-4">
            <div className="mt-4">
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
            </div>
            <div className="mt-4">
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
            </div>
            <div className="mt-4">
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.sendLogin}
          >
            Ingresar
          </Button>
            </div>
          </div>
        </form>
    </Container>
    </React.Fragment>
  );
}
}
