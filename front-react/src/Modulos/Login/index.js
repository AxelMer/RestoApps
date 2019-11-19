import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import  Avatar from '@material-ui/core/Avatar';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Grid from '@material-ui/core/Grid'; 
export default class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      idUser:'',
      usuario:'',
      password:'',
      credencial:'',
    }
   /* this.handleChangeId = this.handleChangeId.bind(this);
    this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
    this.handleChangeNombre = this.handleChangeNombre.bind(this);
    this.handleChangePassword  = this.handleChangePassword.bind(this);
    this.handleChangeCredencial = this.handleChangeCredencial.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeEdit = this.changeEdit.bind(this);
  */
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
            name="cuenta"
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
          />
            </div>
            <div className="mt-4">
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className=""
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
