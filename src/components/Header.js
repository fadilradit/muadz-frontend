import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem ,
    NavLink,
    Dropdown,
    DropdownItem,
    Container,
    Row,
    Col} from 'reactstrap';

class Header extends Component{
    render() {
        return(
            <div className = 'bg-dark' >
              <Container>
                  
                  <Row className = ' bg-dark ' >
                    <Col sm = 'auto' className = 'bg-dark mr-auto'>
                      <Link><h1 className='text'>TITLE</h1></Link>
                    </Col>
                    <Col xs = 'auto' className = ' bg-dark '>
                      <button className='btn btn-outline-light mt-2'>Login</button>
                    </Col>
                    <Col  className = ' bg-dark'>
                      <button className='btn btn-outline-light mt-2'>Sign Up</button>
                    </Col>
                    <Col  className = ' bg-dark' style = {{paddingLeft: 600}}>
                      <button className = 'btn btn-light btn-lg mt-1 ml-5'>keranjang</button>
                    </Col>
                  </Row>

                  <Row className= 'bg-dark'>

                  </Row>
                

              </Container>        
            </div>
        )
    }
}
export default Header;