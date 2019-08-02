import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

class Register extends Component{
    render(){
        return(
            <div>
                <div className = 'mt-5 row' style = {{marginLeft: 50 , marginRight:50}}>
                <div className = 'col-sm-4  card bg-gradient-info'>
                    <div className = 'card-body'>
                        
                        <div className = 'border-bottom border-dark card-title'>
                            <h1>Register Component</h1>
                        </div>

                        <form className = 'input-group '>
                            <input type = 'text' class = 'form-control' placeholder = 'username'/>
                        </form>

                        <form className = 'input-group mt-3'>
                            <input type = 'text' class = 'form-control' placeholder = 'email'/>
                        </form>

                        <form className = 'input-group mt-3'>
                            <input type = 'number' class = 'form-control' placeholder = 'age'/>
                        </form>

                        <form className = 'input-group mt-3'>
                            <input type = 'password' class = 'form-control' placeholder = 'password'/>
                        </form>

                        <button className = 'btn btn-light mt-3 '>Click For Register</button>
                        <p>Anda Sudah Memiliki Akun? Login <Link to = "/login" className = "font-weight-bolder text-danger">Disini</Link> </p>
            
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Register;