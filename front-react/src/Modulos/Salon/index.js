import React from 'react';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import DeckIcon from '@material-ui/icons/Deck';
import Fab from '@material-ui/core/Fab';
import '../../App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PeopleIcon from '@material-ui/icons/People';
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
        //this.openModal = this.openModal.bind(this);
        //this.closeModal = this.closeModal.bind(this);
}
componentDidMount(){
        this.loadData()
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
            <div className="Contenido">
                            <Grid item xs={10}>
                                <Paper>
                                    <i>{data.id}</i>
                                    <br/>
                                    {data.estado === 1 ? 
                    <DeckIcon className="r" fontSize="large" /> 
                    :
                    <DeckIcon className="v" fontSize="large" />
                }<hr/><PeopleIcon fontSize="small" /><i >{data.capacidad}</i>
                                    <hr/>
                            </Paper>
                            </Grid>
            </div>
               
        )
      })
      }

    render(){
        return(
            <Grid container spacing={1}>
                <Grid container item xs={20} spacing={1}>
                    {this.renderList()}
                </Grid>
            </Grid>
        )
    }
}