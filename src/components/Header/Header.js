import React, { Component } from 'react'
import {connect} from 'react-redux'
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

import {onLogoutUser} from '../../action/index'
import {onLogoutAdmin} from '../../action/index'
import './Header.css'

import Logo from '../../Asset/Muadz.png'

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

  navBarToogle = () => {
    const nav = document.querySelector('ul')

    nav.classList.toggle('slide')
    

}




    render() {
        const {user} = this.props
        console.log(user);

        
        
        
        
        if(user.username === ''){
          return(
            <nav className = "header-body">

                <div className = 'header-title'>
                    <h1 >MUADZ</h1>
                </div>
                
                <ul className = 'navbar' >
                    <li><a href = "/">Home</a></li>
                    <li><a href = "/login">Login</a></li>
                    <li><a href = "/register">Sign Up</a></li>
                    
                </ul>

                <div className = 'menu-toogle' onClick = {this.navBarToogle} >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </nav>
            
            // <div className = "sticky-top">
              
            //   <Navbar bg="dark" expand="lg">
            //     <Navbar.Brand href="/" className = "text-light">MUADZ</Navbar.Brand>
            //     <Navbar.Toggle />
            //     <Navbar.Collapse id="basic-navbar-nav">
            //       <Nav className="mr-auto">
            //       </Nav>
                  

            //       <Form inline>
            //         <Nav.Link href="/login" className = "text-light">LOGIN</Nav.Link>
            //         <Nav.Link href="/register" className = "text-light">SIGN UP</Nav.Link>
            //       </Form>

            //     </Navbar.Collapse>
            //   </Navbar>
  
            // </div>
              
          )
          
        }if(user.username !== '' && this.props.admin.username === ''){
          return (
            <nav className = "header-body">

                <div className = 'header-title'>
                    {/* <h1 >MUADZ</h1> */}
                    <img src = {Logo} alt = 'Logo.png' />
                </div>
                
                <ul className = 'navbar' >
                    <li><a href = "/">Home</a></li>
                    <li><a href = "/cart">Cart</a></li>
                    <li><a href = "/orderlist">Payment</a></li>
                    <li><a href = "/profile">Profile</a></li> 
                    <li><a href = "" onClick = {this.onButtonClick} >Logout</a></li> 
                </ul>

                <div className = 'menu-toogle' onClick = {this.navBarToogle} >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </nav>

            // <div className = "sticky-top">
                  
            //       <Navbar bg="dark" expand="lg">
            //         <Navbar.Brand href="/" className = "text-light">MUADZ</Navbar.Brand>
            //         <Navbar.Toggle />
            //         <Navbar.Collapse id="basic-navbar-nav">
            //           <Nav className="mr-auto">
                        
                      
            //           </Nav>
    
                      
            //             <Nav.Link className = "btn btn-dark" href = "/cart"><Cart/></Nav.Link>
            //             <Nav.Link className = "btn btn-dark" href = "/orderlist">Order List</Nav.Link>
            //             <Nav.Link className = "btn btn-dark" href = "/history">History</Nav.Link>
                      
    
    
                      
            //           <Nav.Link href = "/profile" className = "text-light">Profile</Nav.Link>
            //           <Nav.Link className = "text-light" href = "/" onClick = {this.onButtonClick}>Logout</Nav.Link>
                      
                      
    
            //         </Navbar.Collapse>
            //       </Navbar>
      
            //     </div>
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