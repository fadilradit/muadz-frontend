import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'


import fotoSlide1 from '../../../Image/2.jpg'
import fotoSlide2 from '../../../Image/wow.jpg'
import fotoSlide3 from '../../../Image/3.jpg'

import Banner from '../../../components/Banner/Banner'
import Header from '../../../components/Header/Header'
import ProductList from '../../../components/ProductList/ProductList'
import ProductFilter from '../../../components/ProductFilter'
import axios from 'axios'

import './Home.css'

class Home extends Component{

    


    render() {
        return(
            <div className = "main-body">
                <Header/>
              <Banner/>
              <ProductList/>


            </div>
        )
    }
}
export default Home;