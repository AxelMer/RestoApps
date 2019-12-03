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
    const token = localStorage.getItem("access_token");
    axios.get('http://localhost:8000/api/auth/mesas',{
      headers: {
        Authorization: 'Bearer '+token,
        'Content-Type': 'application/json'
      }
    }).then(response=>{
          this.setState({lista:response.data})
          const token = localStorage.getItem("access_token");
          axios.get('http://localhost:8000/api/auth/productos',{
            headers: {
              Authorization: 'Bearer '+token,
              'Content-Type': 'application/json'
            }
          })
          .then(response=>{
            this.setState({listB:response.data})
          }).catch(error=>{
            alert("No se puede conectar con el servidor" + error)
          })
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
  estado: this.state.estado,
  }
  const idU = this.state.idUser;
  axios.put('http://localhost:8000/api/auth/user/'+idU,formData,{
    headers: {
      Authorization: 'Bearer '+token,
      'Content-Type': 'application/json'
    }
  })
    .then(response=>{
        if (response.data.success===true) {
          alert(response.data.message)
          // para cargar datos de nuevo
          this.loadData();
          this.setState({
            open: false,
            idUser:'',
            nombre:'',
            usuario:'',
            password:'',
            credencial:'',
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
                    <Grid container item xs={12} spacing={1}>
                        {this.renderList()}
                    </Grid>
                </Grid>
                  <form>
                          <Dialog open={this.state.open} onClose={this.closeModal} maxWidth="xl"  aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"> 
                              <DialogContent>
                                  <div>
                                    <div>
                                      <div>
                                        <i><DeckIcon className="v" fontSize="medium" />{this.state.idMesa}</i>
                                      </div>
                                      <div>
                                        <i><PeopleIcon fontSize="small"/>{this.state.capacidad}</i>
                                      </div>
                                    </div>
                                        <Grid>
                                        <Button variant="contained" color="primary" >Ocupar Mesa</Button>
                                        </Grid>
                                  </div>
                              </DialogContent>
                          </Dialog>
                  </form>
            </div>
        )
    }
}