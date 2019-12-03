import React from 'react';
import SwipeableTextMobileStepper from '../../componentes/carousel.js';
import '../../App.css';
import Appheader from '../../componentes/appHeader';

export default class Home extends  React.Component{
    UNSAFE_componentWillMount(){
        if(localStorage.length === 0){
            alert("Area Restringida");
            this.props.history.push('/');
        }
    }

render(){
    return(
        <div className="home">
        <Appheader/>
        <div> BIENVENIDOS</div>
        <div className="carousel"><SwipeableTextMobileStepper /></div>

        </div>   
    )
}
}