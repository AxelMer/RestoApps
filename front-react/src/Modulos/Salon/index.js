import React from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import DeckIcon from '@material-ui/icons/Deck';
import '../../App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PeopleIcon from '@material-ui/icons/People';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Table } from 'reactstrap';
import { Input } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';


export default class Salon extends React.Component{
constructor(props){
        super(props);
        this.state = {
          idMesa:'',
          lista:[],
          listB:[],
          capacidad:'',
          estado:'',
          open:false,
          boton:''
        }
        //this.handleChangeEstado  = this.handleChangeEstado.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
}
componentDidMount(){
        this.loadData()
}
cambiarBoton(event){
    this.setState({boton: event.target.value})
}
openModal() {
    this.setState({ 
        open: true });   
}
closeModal() {
    this.setState({ open: false });
}

loadData = (e) =>{
        axios.get('http://localhost:8000/mesas')
        .then(response=>{
          this.setState({lista:response.data})
        }).catch(error=>{
          alert("No se puede conectar con el servidor" + error)
        });
        axios.get('http://localhost:8000/productos')
        .then(response=>{
          this.setState({listB:response.data})
        }).catch(error=>{
          alert("No se puede conectar con el servidor" + error)
        })

}
sendPedidos(){

}
listTable(){
            return this.state.listB.map((data)=>{
                    return(
                        <tr key={data.id}> 
                            <td>
                            <ListItem role="listitem" button >
                                <ListItemIcon>
                                    <Checkbox
                                    disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText  primary={data.articulo} />
                                </ListItem>
                            </td>
                            <td><ListItemText id={data.id} primary={data.categoria} /></td>
                            <td>${data.precio}</td>
                            <td ><Input id="precio" variant="outlined" aria-describedby="outlined-weight-helper-text" /></td>
                        </tr>
                        )
            })
}

dataMesa=(data)=>{
    this.setState({
      idMesa: data.id,
      estado: data.estado,
      open:true,
    })
}
renderList(){
    return this.state.lista.map((data)=>{
        return(
            <Grid item xs={2} zeroMinWidth>
                <Paper>
                    {data.estado === 1 ? 
                        <Tooltip title="Add" placement="top">
                            <Button onClick={()=>this.dataMesa(data)}>
                                <DeckIcon className="r" fontSize="large" /> 
                            </Button>
                        </Tooltip>      
                    :
                    <Tooltip title={data.id} placement="top">
                    <Button onClick={()=>this.dataMesa(data)}><DeckIcon className="v" fontSize="large" /> </Button>
                </Tooltip>  
                }<hr/>  
                    <i><PeopleIcon fontSize="small"/>
                        <Typography>{data.capacidad}</Typography></i>
                                    <hr/>
                </Paper>
            </Grid>   
        )
      })
}

render(){
        return(
            <div>
            <Grid className='centrar'>
                <Grid container item xs={20} spacing={1}>
                    {this.renderList()}

                </Grid>
            </Grid>
                          <form>
                          <Dialog open={this.state.open} onClose={this.closeModal} maxWidth="xl"  aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"> 
                              <DialogContent>
                                  <div>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Table className="table" size="sm" aria-label="a dense table" >
                                                <thead>
                                                <tr>
                                                    <th>Articulo</th>
                                                    <th>Categoria</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {this.listTable()}
                                                </tbody>

                                            </Table>

                                        </Grid>
                                        <Grid item xs={6}>
                                          <h5>Numero de Mesa: {this.state.idMesa} </h5>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <h5>Total:   </h5>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button variant="contained" color="primary" >Realizar Pedido</Button>
                                        </Grid>
                                    </Grid>
                                    </div>
                              </DialogContent>
                          </Dialog>
                        </form>
                        </div>
        )
    }
}