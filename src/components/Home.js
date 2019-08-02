import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'

import './Register.css'

class Home extends Component{
    render() {
        return(
            <div className = 'mt-5'> 
                <Container style = {{backgroundColor: 'gray'}}>
                        <h1 className = 'banner'>Banner</h1>

                        <Row  className = 'border border-dark'>
                            <Col className = 'border border-dark'>
                              <Link className = 'text-justify-center' >MEN</Link>
                            </Col>
                            <Col  className = 'border border-dark '>
                              <Link  className = 'text'>WOMEN</Link>
                            </Col>
                            <Col  className = 'border border-dark '>
                              <Link  className = 'text'>WOMEN</Link>
                            </Col>
                        </Row>
                </Container>
            </div>
        )
    }
}
export default Home;