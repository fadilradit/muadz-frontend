import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import {connect}  from 'react-redux'
import cookies from 'universal-cookie';

import Register from './Register'
import Login from './Login'
import Home from './Home'
import Header from './Header'
import Profile from './Profile'
import ProductDetail from './ProductDetail'

import {keepLogin} from '../action/index'

const cookie = new cookies()

class App extends Component{

    componentDidMount() {
        const objCookie = cookie.get('username')
        if(objCookie !== undefined){
            this.props.keepLogin(objCookie)
        }
    }


    render(){
        return(
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/register"  component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/productdetail" component={ProductDetail}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, {keepLogin}) (App)