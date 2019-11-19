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
import Drawer from '@material-ui/core/Drawer';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
export default class Salon extends React.Component{
constructor(props){
        super(props);
        this.state = {
          idMesa:'',
          lista:[],
          capacidad:'',
          estado:'',
          open:false,
        }
        //this.handleChangeCapacidad  = this.handleChangeCapacidad.bind(this);
        //this.handleChangeEstado  = this.handleChangeEstado.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
}
componentDidMount(){
        this.loadData()
}
openModal() {
    this.setState({ open: true });
            return(
                <Dialog open={this.state.open} onClose={this.closeModal}  disableBackdropClick aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"> 
                  <DialogContent>
                    <DialogTitle id="alert-dialog-title">Modificar datos</DialogTitle>
                      <DialogContentText id="alert-dialog-description">
                          Actualizar datos.
                      </DialogContentText>
                      <DialogContent>
             
                      </DialogContent>
                      <DialogActions>
                            <Button  color="primary">
                              Cancel
                            </Button>
                            <Button  color="primary">
                              Actualizar
                            </Button>
                          </DialogActions>
                  </DialogContent>
                </Dialog>
            )
   
}
closeModal() {
    this.setState({ open: false });
}


loadData = (e) =>{
        axios.get('http://localhost:8000/Mesa')
        .then(response=>{
          this.setState({lista:response.data})
        }).catch(error=>{
          alert("No se puede conectar con el servidor" + error)
        })
}

  renderList(){
    return this.state.lista.map((data)=>{
        return(
            <Grid item xs={2} zeroMinWidth>
                <Paper>
                    {data.estado === 1 ? 
                        <Tooltip title="Add" placement="top">
                            <Button onClick={this.openModal}>
                                <DeckIcon className="r" fontSize="large" /> 
                            </Button>
                        </Tooltip>      
                    :
                    <Tooltip title={data.id} placement="top">
                    <Button><DeckIcon className="v" fontSize="large" /> </Button>
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
            <Grid className='centrar'>
                <Grid container item xs={20} spacing={1}>
                    {this.renderList()}
                </Grid>
            </Grid>
        )
    }
}