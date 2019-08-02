import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Register from './Register'
import Login from './Login'
import Home from './Home'
import Header from './Header'

class App extends Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/register"  component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/home" component={Home}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;