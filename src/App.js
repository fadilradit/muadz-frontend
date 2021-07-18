import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import {connect}  from 'react-redux'
import cookies from 'universal-cookie';

import Register from './Page/User/Register/Register'
import Login from './Page/User/Login/Login'
import Home from './Page/User/Home/Home'
import Profile from './Page/User/Profile/Profile'
import ProductDetail from './Page/User/ProductDetail/ProductDetail'
import AddProduct from './components/admin/AddProduct'
import AddCategories from './components/admin/AddCategories'
import LoginAdmin from './components/admin/LoginAdmin'
import HomeAdmin from './components/admin/HomeAdmin'
import ManageTransaction from './components/admin/ManageTransaction'
import ProductList from './components/ProductList/ProductList'
import Cart from './Page/User/Cart/Cart'
import ProductFilter from './components/ProductFilter'
import Checkout from './Page/User/Checkout/Checkout'
import OrderList from './Page/User/OrderList/OrderList'
import History from './Page/User/History/History'
import Header from './components/Header/Header'


import {keepLogin} from './action/index'
import {keepLoginAdmin} from './action/index'

const cookie = new cookies()

class App extends Component{

    componentWillMount() {
        const objCookie = cookie.get('username')
        const objCookie2 = cookie.get('Admin')
        

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
                    <Header/>
                </div>
                <div >      
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
                    <Route path="/productfilter" component={ProductFilter}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orderlist" component={OrderList}/>
                    <Route path="/history" component={History}/>
                    <Route path="/managetransaction" component={ManageTransaction}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, {keepLogin, keepLoginAdmin}) (App)