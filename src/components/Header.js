import React, { Component } from 'react'
import {connect} from 'react-redux'
import {onLogoutUser} from '../action/index'
import {onLogoutAdmin} from '../action/index'
import Cart from '@material-ui/icons/ShoppingCart';
import cookies from 'universal-cookie'




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

  
  
} from 'react-bootstrap'

import DropdownMenu from 'react-bootstrap/DropdownMenu';

const cookie = new cookies()
class Header extends Component{

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onButtonClick = () => {
    this.props.onLogoutUser()
  }
  onButtonClick2 = () => {
    this.props.onLogoutAdmin()
  }




    render() {
        const {user} = this.props
        console.log(user);
        console.log(this.props.admin);
        
        
        
        
        if(user.username === '' && this.props.admin.username === ''){
          return(
            
            <div className = "sticky-top">
              
              <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="/" className = "text-light">MUADZ</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    
                    <Dropdown>
                      <Dropdown.Toggle variant="dark">MEN</Dropdown.Toggle>

                      <DropdownMenu>
                        <Dropdown.Item >Action</Dropdown.Item>
                        <Dropdown.Item >Another action</Dropdown.Item>
                        <Dropdown.Item >Something</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item >Separated link</Dropdown.Item>
                      </DropdownMenu>
                    </Dropdown>

                    <Dropdown>
                      <Dropdown.Toggle variant="dark">WOMEN</Dropdown.Toggle>

                      <DropdownMenu>
                        <Dropdown.Item >Action</Dropdown.Item>
                        <Dropdown.Item >Another action</Dropdown.Item>
                        <Dropdown.Item >Something</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item >Separated link</Dropdown.Item>
                      </DropdownMenu>
                    </Dropdown>

                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="dark" className = "text-light">Search</Button>
                  </Form>
                  </Nav>
                  
                  <Nav.Link className = "btn btn-dark" href = "/cart"><Cart/></Nav.Link>

                  <Form inline>
                    <Nav.Link href="/login" className = "text-light">LOGIN</Nav.Link>
                    <Nav.Link href="/register" className = "text-light">SIGN UP</Nav.Link>
                  </Form>

                </Navbar.Collapse>
              </Navbar>
  
            </div>
              
          )
          
        }if(user.username !== '' && this.props.admin.username === ''){
          return (
            <div className = "sticky-top">
                  
                  <Navbar bg="dark" expand="lg">
                    <Navbar.Brand href="/" className = "text-light">MUADZ</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
                        
                      <Dropdown>
                          <Dropdown.Toggle variant="dark">MEN</Dropdown.Toggle>
    
                          <DropdownMenu>
                          <Dropdown.Item >Action</Dropdown.Item>
                          <Dropdown.Item >Another action</Dropdown.Item>
                          <Dropdown.Item >Something</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item >Separated link</Dropdown.Item>
                          </DropdownMenu>
                        </Dropdown>
    
                        <Dropdown>
                          <Dropdown.Toggle variant="dark">WOMEN</Dropdown.Toggle>
    
                          <DropdownMenu>
                          <Dropdown.Item >Action</Dropdown.Item>
                          <Dropdown.Item >Another action</Dropdown.Item>
                          <Dropdown.Item >Something</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item >Separated link</Dropdown.Item>
                          </DropdownMenu>
                        </Dropdown>
    
                        <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search</Button>
                      </Form>
                      </Nav>
    
                      
                        <Nav.Link className = "btn btn-dark" href = "/cart"><Cart/></Nav.Link>
                      
    
    
                      
                      <Nav.Link href = "/profile" className = "text-light">Profile</Nav.Link>
                      <Nav.Link className = "text-light" href = "/" onClick = {this.onButtonClick}>LOGOUT</Nav.Link>
                      
                      
    
                    </Navbar.Collapse>
                  </Navbar>
      
                </div>
          )
    
        }        
        
    }

    

    
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    admin: state.authAdmin
  }
}
export default connect(mapStateToProps, {onLogoutUser}) (Header);