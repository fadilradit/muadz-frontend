import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'

import fotoSlide1 from '../Image/cewekcowok.jpg'
import fotoSlide2 from '../Image/cewek3.jpg'
import fotoSlide3 from '../Image/cowok2.jpg'

class Banner extends Component{
    render() {
        return(
            <div className = 'mt-3 container'> 
            
              <div className = "col-sm-auto">
              <Container>
            <Row>           
                <Carousel className = " d-inline w-100" >
                  <Carousel.Item>
                    <img className="d-block w-100 col-sm-auto" src={fotoSlide1} alt="First slide" width="100%" height="550" />
                    <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                  </Carousel.Item>

                    <Carousel.Item>
                      <img className="d-block w-100 col-sm-auto" src={fotoSlide2} alt="Third slide" width="100%" height="550"/>

                      <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                      <img className="d-block w-100" src={fotoSlide3} alt="Third slide" width="100%" height="550"/>

                      <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
          </Carousel>
        </Row>           
</Container>
              </div>
            </div>
        )
    }
}

export default Banner;