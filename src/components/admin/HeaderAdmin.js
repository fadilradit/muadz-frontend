import React, {Component} from 'react'
import {connect} from 'react-redux'
import {onLogoutAdmin} from '../../action/index'

import {
    NavDropdown,
    Navbar,
    NavbarBrand,
    Nav,
    FormControl,
    Button,
    Form,
    ButtonToolbar,
  DropdownButton,
  Dropdown,
  ToggleButton,
  
    
    
  } from 'react-bootstrap';

  class HeaderAdmin extends Component{


    onButtonClick = () => {
        this.props.onLogoutAdmin()
    }




    render(){
        if(this.props.user){
          console.log(this.props.user);
          
            return(
                <div className = "sticky-top">
              
              <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="/" className = "text-light">MUADZ</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Form inline>
                    <Nav.Link href="/loginadmin" className = "text-light" onClick = {this.onButtonClick}>LOGOUT</Nav.Link>
                  </Form>

                </Navbar.Collapse>
              </Navbar>
  
            </div>
            )
        } if(!this.props.user){
          return(
            <div className = "sticky-top">
          
          <Navbar bg="dark" expand="lg">
            <Navbar.Brand href="/HomeAdmin" className = "text-light">MUADZ</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="basic-navbar-nav">
              
  
            </Navbar.Collapse>
          </Navbar>
  
        </div>
        )
        }
    }


  }


  const mapStateToProps = state => {
      return{
          user : state.auth
      }
  }

  export default connect(mapStateToProps, {onLogoutAdmin}) (HeaderAdmin) ;