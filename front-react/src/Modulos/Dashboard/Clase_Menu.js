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
import InputAdornment from '@material-ui/core/InputAdornment';

export default class Menu extends  React.Component{
  constructor(props){
    super(props);
    this.state = {
      lista:[],
      idProducto:'',
      articulo:'',
      categoria:'',
      precio:'',
      cantidad: '',
      open:false,
      edit:false
    }
    this.handleChangeId = this.handleChangeId.bind(this);
    this.cambiarArticulo = this.cambiarArticulo.bind(this);
    this.cambiarCantidad = this.cambiarCantidad.bind(this);
    this.cambiarCategoria  = this.cambiarCategoria.bind(this);
    this.cambiarPrecio = this.cambiarPrecio.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeEdit = this.changeEdit.bind(this);
  }
    componentDidMount(){
      this.loadData()
    }
    //
    cambiarArticulo(event){
      this.setState({articulo: event.target.value})
    }
    cambiarCategoria(event){
      this.setState({categoria: event.target.value})
    }
    cambiarPrecio(event){
      this.setState({precio: event.target.value})
    }
    cambiarCantidad(event){
      this.setState({cantidad:event.target.value})
    }
    handleChangeId(event){
      this.setState({idProducto:event.target.value})
    }
    openModal() {
      this.setState({ open: true });
    }
    closeModal() {
      this.setState({ 
        open: false,
        edit:false,
        idProducto:'',
        articulo:'',
        categoria:'',
        precio:'',
        cantidad: '',
      });
    }
    changeEdit() {
      this.setState({ edit: true });
    }
  
  //Metodo para traer la los datos
    loadData = (e) =>{
      const token = localStorage.getItem("access_token");
      axios.get('http://localhost:8000/api/auth/productos',{
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
  ///Metodos para Agregar nuevo producto  ****FUNCIONANDO****
    addProduct=(e)=>{
      e.preventDefault();
        const baseUrl = 'http://localhost:8000/';
        const token = localStorage.getItem("access_token");
        const formData = new FormData()
          formData.append('articulo',this.state.articulo)
          formData.append('categoria',this.state.categoria)
          formData.append('precio',this.state.precio)
          formData.append('cantidad',this.state.cantidad)
  
          axios.post(baseUrl+'/api/auth/productos',formData,{
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
                  idProducto:'',
                  articulo:'',
                  categoria:'',
                  precio:'',
                  cantidad: '',
                  open: false
                })
              }
  
          }).catch(error=>{
            alert("Error "+error)
          })
  
    }
  
  //Metodos Para Editar usuario existente ****FUNCIONANDO****
    editProduct=(data)=>{
        this.setState({
          idProducto: data.id,
          articulo: data.articulo,
          categoria: data.categoria,
          precio: data.precio,
          cantidad: data.cantidad,
          open:true,
          edit:true
        })
    }
    sendUpdate=(e)=>{
    const formData = {
      id: this.state.idProducto,
      articulo: this.state.articulo,
      categoria: this.state.categoria,
      cantidad: this.state.cantidad,
      precio: this.state.precio,
    }
    const baseUrl = 'http://localhost:8000/';
    const idU = this.state.idProducto;
    console.log(idU)
    axios.put(baseUrl+'/productos/'+idU,formData).then(response=>{
  
      if (response.data.success===true) {
        alert(response.data.message)
        // para cargar datos de nuevo
        this.loadData();
        this.setState({
          idProducto:'',
          articulo:'',
          categoria:'',
          precio:'',
          cantidad: '',
          open: false
        })
      }
  
    }).catch(error=>{
      alert("Error 456"+error)
    })
  
    }
  
  //Metodos para Eliminar usuario **FUNCIONA CON PROBLEMAS** // Tenes que clickear dos veces
  productDelete(data){ 
    // id seleccionado para eliminar
    this.setState({ idProducto:data.id }, () => {
    if(this.state.idProducto){
      this.sendDelete()
    }else{
      alert("No se puede borrar");
    }
    })
  }
  sendDelete(){
    const baseUrl = 'http://localhost:8000/';
      //Todo el codigo para eliminar un user de la tabla 
      axios.delete(baseUrl+'/api/auth/productos/'+this.state.idProducto)
        .then(res => {
          this.loadData();
        })
        .catch(error=>{
          console.log(error);
          console.log(error.data);
          alert("Error 456"+error)
        })
  }
  renderList(){
    return this.state.lista.map((data)=>{
        return(
      <tr key={data.id}> 
        <td>{data.id}</td>
        <td>{data.articulo}</td>
        <td>{data.categoria}</td>
        <td>{data.cantidad}</td>
        <td>${data.precio}</td>
        <td>
        <Button
          size="small" 
          variant="contained"
          color="primary"
          value={data.id}
          onClick={()=>this.editProduct(data)}
        >
      <EditRoundedIcon/>Edit
      </Button>
        <Button
        size="small" 
        variant="contained"
        color="secondary"
        onClick={()=>this.productDelete(data)}
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
                <h1>Administrador de Menu</h1>
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
                        <th>Articulo</th>
                        <th>Categoria</th>
                        <th>Stock</th>
                        <th>Precio</th>
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
                    Agregar Producto
                  </Button>               
                  :
                  <Button size="small" variant="contained" color="primary" onClick={this.openModal} >
                    <AddIcon/>
                    Agregar Producto
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
                            value={this.state.idProducto} 
                            onChange={this.handleChangeId} 
                            fullWidth
                            disabled />
                          <TextField 
                            autoFocus 
                            margin="dense" 
                            id="articulo" 
                            label="articulo" 
                            type="text" 
                            value={this.state.articulo} 
                            onChange={this.cambiarArticulo} 
                            fullWidth />
                          <Select
                            labelId="demo-simple-select-label"
                            margin="dense" 
                            id="categoria"
                            fullWidth
                            value={this.state.categoria}
                            onChange={this.cambiarCategoria}
                          >
                            <MenuItem value={'comida'}>Comida</MenuItem>
                            <MenuItem value={'bebidas'}>Bebidas</MenuItem>
                            <MenuItem value={'postre'}>Postre</MenuItem>
                          </Select>
                          <TextField 
                            autoFocus 
                            margin="dense" 
                            id="precio" 
                            label="precio" 
                            type="text" 
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            value={this.state.precio}
                            onChange={this.cambiarPrecio}
                            fullWidth />
                          <TextField
                            margin="dense"
                            id="cantidad"
                            label="Cantidad"
                            type="text"
                            value={this.state.cantidad}
                            onChange={this.cambiarCantidad}
                            fullWidth />
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
                            id="id" 
                            label="id" 
                            type="text" 
                            value={this.state.idProducto} 
                            onChange={this.handleChangeId} 
                            fullWidth
                            disabled />
                          <TextField 
                            autoFocus 
                            margin="dense" 
                            id="articulo" 
                            label="articulo" 
                            type="text" 
                            value={this.state.articulo} 
                            onChange={this.cambiarArticulo} 
                            fullWidth />
                          <Select
                            labelId="demo-simple-select-label"
                            label="Categoria"
                            margin="dense" 
                            id="categoria"
                            fullWidth
                            value={this.state.categoria}
                            onChange={this.cambiarCategoria}
                          >
                            <MenuItem value={'comidas'}>Comidas</MenuItem>
                            <MenuItem value={'bebidas'}>Bebidas</MenuItem>
                            <MenuItem value={'postres'}>Postres</MenuItem>
                          </Select>
                          <TextField 
                            autoFocus 
                            margin="dense" 
                            id="precio" 
                            label="precio" 
                            type="text" 
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            value={this.state.precio}
                            onChange={this.cambiarPrecio}
                            fullWidth />
                          <TextField
                            margin="dense"
                            id="cantidad"
                            label="Cantidad"
                            type="text"
                            value={this.state.cantidad}
                            onChange={this.cambiarCantidad}
                            fullWidth />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.closeModal} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={this.addProduct} color="primary">
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