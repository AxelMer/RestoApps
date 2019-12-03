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
        //this.handleChangeEstado  = this.handleChangeEstado.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
}
componentDidMount(){
        this.loadData()
}
openModal() {
    this.setState({ 
        open: true });   
}
closeModal() {
    this.setState({ open: false });
}

loadData = (e) =>{
    const token = localStorage.getItem("access_token");
    axios.get('http://localhost:8000/api/auth/mesas',{
      headers: {
        Authorization: 'Bearer '+token,
        'Content-Type': 'application/json'
      }
    }).then(response=>{
          this.setState({lista:response.data})
        }).catch(error=>{
          alert("No se puede conectar con el servidor" + error)
        });
}
dataMesa=(data)=>{
    this.setState({
      idMesa: data.id,
      estado: data.estado,
      capacidad:data.capacidad,
      open:true,
    })
}
updateEstado = (e) =>{
  const token = localStorage.getItem("access_token");
  const formData = {
  id: this.state.idMesa,
  capacidad: this.state.capacidad,
  estado: this.state.estado,
  }
  const idM = this.state.idMesa;
  axios.put('http://localhost:8000/api/auth/mesas/'+idM,formData,{
    headers: {
      Authorization: 'Bearer '+token,
      'Content-Type': 'application/json'
    }
  })
    .then(response=>{
        if (response.data.success===true) {
          this.loadData();
          this.setState({
            idMesa:'',
            lista:[],
            capacidad:'',
            estado:'',
            open:false,
          })
        }
      }).catch(error=>{
        alert("Error 456"+error)
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
                          <Button onClick={()=>this.dataMesa(data)}>
                            <DeckIcon className="v" fontSize="large" />
                          </Button>
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
                    <Grid container item xs={12} spacing={1}>
                        {this.renderList()}
                    </Grid>
                </Grid>
                  <form>
                          <Dialog open={this.state.open} onClose={this.closeModal} maxWidth="xl"  aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"> 
                              <DialogContent>
                                  <div>
                                    <div>
                                    <Grid container spacing={4}>
                                      <Grid item xs>
                                      <i><DeckIcon fontSize="small" />{this.state.idMesa}</i>
                                      </Grid>
                                      <Grid item xs>
                                      <i><PeopleIcon fontSize="small"/>{this.state.capacidad}</i>
                                      </Grid>
                                    </Grid>
                                      <hr/>
                                    </div>
                                          {this.state.estado === 1 ? 
                                            <Grid>
                                              <Button id="0"  value="0" variant="contained" color="primary" >Liberar Mesa</Button><br/>
                                              <Button id="1"  value="1" variant="contained" color="primary" disabled>Ocupar Mesa</Button>
                                            </Grid>
                                          :
                                            <Grid>
                                              <Button id="0"  value="0" variant="contained" color="primary" disabled>Liberar Mesa</Button><br/>
                                              <Button id="1"  value="1" variant="contained" color="primary" onClick={this.updateEstado} >Ocupar Mesa</Button>
                                            </Grid>
                                          }

                                  </div>
                              </DialogContent>
                          </Dialog>
                  </form>
            </div>
        )
    }
}