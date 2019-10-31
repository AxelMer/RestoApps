import React, { Component } from 'react';
import axios from "axios";
import cookie from "js-cookie";
import Error from "./componente/error";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import  Avatar from '@material-ui/core/Avatar';
import FastfoodIcon from '@material-ui/icons/Fastfood'; 
export default class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {cuenta:"", password:"", errors:{}};
  }
  handleForm = e => {
    e.preventDefault();
    const data = { cuenta: this.state.cuenta, password: this.state.password };

    axios
      .post("http://localhost:8000/api/auth/login", data)
      .then(res => {
        cookie.set("token", res.data.access_token);
        this.props.setLogin(res.data.user);
        this.props.history.push("/home");
      })
      .catch(e => this.setState({ errors: e.response.data.errors }));
  };

  handleInput = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

render() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar>
          <FastfoodIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresa a Restoapp
        </Typography>
      </div>
      <form onSubmit={this.handleForm}>
          <div className="p-4">
            <Error
              error={
                this.state.errors["result"]
                  ? this.state.errors["result"]
                  : null
              }
            />
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
            onChange={this.handleInput}
          />
              <Error
                error={
                  this.state.errors["cuenta"]
                    ? this.state.errors["cuenta"]
                    : null
                }
              />
            </div>
            <div className="mt-4">
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={this.handleInput}
            name="password"
            label="Contraseña"
            type="password"
            id="password"
          />
              <Error
                error={
                  this.state.errors["password"]
                    ? this.state.errors["password"]
                    : null
                }
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
  );
}
}
