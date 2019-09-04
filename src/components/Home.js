import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'


import fotoSlide1 from '../Image/2.jpg'
import fotoSlide2 from '../Image/wow.jpg'
import fotoSlide3 from '../Image/3.jpg'

import Banner from './Banner'
import Header from './Header'
import ProductList from './ProductList'
import ProductFilter from './ProductFilter'
import axios from 'axios'

class Home extends Component{

    


    render() {
        return(
            <div>
                <Header/>
              <Banner/>
              <ProductList/>
            </div>
        )
    }
}
export default Home;