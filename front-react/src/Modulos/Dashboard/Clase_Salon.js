import React from 'react';
import '../../App.css';
import Appheader from '../../componentes/appHeader';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Table, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


export default class Salon extends  React.Component{
  constructor(props){
    super(props);
    this.state = {
      idMesa:'',
      lista:[],
      capacidad:'',
      estado:'',
      open:false,
    }
    this.handleChangeCapacidad  = this.handleChangeCapacidad.bind(this);
    this.handleChangeEstado  = this.handleChangeEstado.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
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
    1000
);
}*/
//Los cambios de los inputs
handleChangeCapacidad(event){
  this.setState({capacidad: event.target.value})
}
handleChangeEstado(event){
  this.setState({estado: event.target.value})
}
//Metodo para traer la los datos
loadData = (e) =>{
  const token = localStorage.getItem("access_token");
    axios.get('http://localhost:8000/api/auth/mesas',{
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
addMesa=(e)=>{
  e.preventDefault();
    const baseUrl = 'http://localhost:8000/';
    const token = localStorage.getItem("access_token");
    const formData = new FormData()
      formData.append('capacidad',this.state.capacidad)

      axios.post(baseUrl+'/api/auth/mesas',formData,{
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
              capacidad:'',
              estado:'',
              open: false
            })
          }
      }).catch(error=>{
        alert("Error "+error)
      })

}

//Configuracion del estado del Modal
openModal() {
  this.setState({ open: true });
}
closeModal() {
  this.setState({ open: false });
}

 //Organiza la lista del json que traemos de la API
  renderList(){

    return this.state.lista.map((data)=>{
        return(
      <tr>
        <td>{data.id}</td>
        <td>{data.capacidad}</td>
        <td> 
          {data.estado === 1 ? 
        <i className="r">Ocupado</i>
        :
       <i className="v">Libre</i>
      }
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
                <h1>Administracion de Salon</h1>
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
                        <th>Capacidad</th>
                        <th>Estado</th>
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
                  Nueva Mesa
                </Button>               
                :
                <Button size="small" variant="contained" color="primary" onClick={this.openModal} >
                  <AddIcon/>
                  Nueva Mesa
                </Button>   
                }
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
                  id="capacidad"
                  label="Sillas"
                  type="number"
                  value={this.state.capacidad}
                  onChange={this.handleChangeCapacidad}
                  fullWidth
                   />
               </DialogContent>
               <DialogActions>
               <Button onClick={this.closeModal} color="primary">
            Cancel
          </Button>
          <Button onClick={this.addMesa} color="primary">
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