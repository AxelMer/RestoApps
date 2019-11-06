import React from 'react';
import SwipeableTextMobileStepper from '../../componentes/carousel.js';
import '../../App.css';
import Appheader from '../../componentes/appHeader';

const Home =() => {
    return (
        <div className="home">
            <Appheader/>
            <div> BIENVENIDOS</div>
            <div className="carousel"><SwipeableTextMobileStepper /></div>

        </div>
        )
    }
export default Home; 