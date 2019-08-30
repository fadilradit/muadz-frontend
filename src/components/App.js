import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import {connect}  from 'react-redux'
import cookies from 'universal-cookie';

import Register from './Register'
import Login from './Login'
import Home from './Home'
import Profile from './Profile'
import ProductDetail from './ProductDetail'
import AddProduct from './admin/AddProduct'
import AddCategories from './admin/AddCategories'
import LoginAdmin from './admin/LoginAdmin'
import HomeAdmin from './admin/HomeAdmin'
import ProductList from './ProductList'
import Cart from './Cart'

import {keepLogin} from '../action/index'
import {keepLoginAdmin} from '../action/index'

const cookie = new cookies()

class App extends Component{

    componentDidMount() {
        const objCookie = cookie.get('username')
        const objCookie2 = cookie.get('Admin')
        console.log(objCookie2);
        

        if(objCookie !== undefined){
            this.props.keepLogin(objCookie)
            
        }if(objCookie2 !== undefined){
            this.props.keepLoginAdmin(objCookie2)
        }
    }


    render(){
        return(
            <BrowserRouter>
                <div>      
                    <Route path="/" exact component={Home}/>
                    <Route path="/register"  component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/productdetail/:products_id" component={ProductDetail}/>
                    <Route path="/addproduct" component={AddProduct}/>
                    <Route path="/addcategories" component={AddCategories}/>
                    <Route path="/loginadmin" component={LoginAdmin}/>
                    <Route path="/homeadmin" component={HomeAdmin}/>
                    <Route path="/productlist" component={ProductList}/>
                    <Route path="/cart" component={Cart}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, {keepLogin, keepLoginAdmin}) (App)