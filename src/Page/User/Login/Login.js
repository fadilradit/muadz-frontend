import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {onLoginUser} from '../../../action/index'
import {Redirect} from 'react-router-dom'

import Header from '../../../components/Header/Header'
import background from '../../../Image/BW.jpg'

class Login extends Component{


    onButtonClick = () => {
        const username = this.username.value
        const password = this.password.value

        console.log(username);
        console.log(password);
        
        this.props.onLoginUser(username, password)
    }


    render() {
        if(this.props.user.username === ''){
            return(
                <div>
                    <Header/>
                    <div className = 'mt-5 justify-content-center row' style = {{marginLeft: 50 , marginRight:50}}>
                    <div className = ' col-sm-4  card' style = {{backgroundImage: `url(${background})`}}>
                        <div className = 'card-body'>
                            
                            <div className = 'border-bottom border-light card-title'>
                                <h1 className = "text-light">Login</h1>
                            </div>
    
                            <form className = 'input-group mt-5 '>
                                <input type = 'text' class = 'form-control' placeholder = 'username'
                                    ref = {(input) => {this.username = input}} />
                            </form>
    
                            <form className = 'input-group mt-3'>
                                <input type = 'password' class = 'form-control' placeholder = 'password'
                                    ref = {(input) => {this.password = input}}/>
                            </form>
    
                            <button onClick = {this.onButtonClick} className = 'btn btn-light btn-outline-dark mt-5 '>Click For Login</button>
                            <p className = "text-light">Anda Belum Memiliki Akun? Daftar <Link to = "/register" className = "font-weight-bolder text-primary">Disini</Link> </p>
                
                        </div>
                    </div>
                </div>
                </div>
            )
        }

        return <Redirect to = '/' />
    }
}

const mapStateToProps = state => {
    return {
        user : state.auth
    }
}


export default connect(mapStateToProps, {onLoginUser}) (Login)