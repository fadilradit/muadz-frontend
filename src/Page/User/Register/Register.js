import React, {Component} from 'react'
import { Link, Redirect} from 'react-router-dom'
import Username from '@material-ui/icons/AccountCircle'
import Phone from '@material-ui/icons/Phone'
import axios from 'axios'

import Header from '../../../components/Header/Header'
import background from '../../../Image/BW.jpg'
import Logo from '../../../Asset/Icon/Muadz@2x.png'
import './Register.css'


class Register extends Component{


    state = {
        regis : false
    }


    onButtonClick = () => {
        const username = this.username.value
        const email = this.email.value
        const password = this.password.value
        const phone_number = this.phone_number.value
        const gender = this.gender.value
        const nama_lengkap = this.nama_lengkap.value

        console.log(username);
        console.log(email);
        console.log(password);
        console.log(phone_number);
        console.log(gender);
        console.log(nama_lengkap);
        

        axios.post ('http://localhost:1993/register', 
        {
            username,
            email,
            password,
            phone_number,
            gender,
            nama_lengkap,
        }).then((res) => {
            if(typeof(res.data) == 'string' ){
                alert(res.data)
                console.log(res.data);
                
            } if(res.data.username === username) {
                alert(res.data)
            console.log(res);
            
            }if((res.data.length > 0) && (typeof(res.data) !== 'string')) {alert ('Berhasil Mendaftar Silahkan Melakukan Login')
                console.log(res)
                this.setState({regis: true})
                    
            }if(res.data.email === email){
                alert(res.data)
                console.log(res);
                
            }

        })

        
    }


    //Show Password
    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    toggleShow(){
        this.setState({hidden: !this.state.hidden});
    }

    componentDidMount(){
        if(this.props.password){
            this.setState({password: this.props.password});
        }
    }

    onlyNumber = (evt) => {
        var theEvent = evt || window.event;
      
        
          var key = theEvent.keyCode || theEvent.which;
          key = String.fromCharCode(key);
        
        var regex = /[0-9]|\./;
        if(!regex.test(key)){
          theEvent.returnValue = false;
          if(theEvent.preventDefault)theEvent.preventDefault();
        }
      }



    render(){
        if (this.state.regis) {
            return <Redirect to='/login'/>}
        return(
            <div className = "register-body" id = "register-body" >
                    <div className = "register-logo" id = "register-logo" >
                        <img src = {Logo} />
                        <p>Toko Busana Muslim dan Muslimah</p>
                    </div>
                    <div className = "register-form" id="register-form" >

                        <div className = "register-card" id = "register-card" >
                            <div className = "register-formTitle" id = "register-formTitle" >
                                <h1>Sign Up</h1>
                            </div>
                        
                                <input className = "register-field" type = 'text'  placeholder = 'Nama Lengkap'
                                   ref = {(input) => {this.nama_lengkap = input}} />
                            
                                <input className = "register-field" type = 'text'  placeholder = 'Username'
                                   ref = {(input) => {this.username = input}} />
                            
                                <input className = "register-field" type = 'text'  placeholder = 'E-mail'
                                   ref = {(input) => {this.email = input}} />
                            
                                <input className = "register-field" type = 'text'  placeholder = 'No.Handphone'
                                   ref = {(input) => {this.phone_number = input}} onKeyPress = {(e) => {this.onlyNumber(e)}} maxLength = "14" />
                            
                        
                                <input className = "register-field" type = 'password'  placeholder = 'password'
                                     ref = {(input) => {this.password = input}}/>

                                <select className = "register-field" ref = {(input) => {this.gender = input}} >
                                      
                                    <option value = "" >Pilih Jenis Kelamin</option>     
                                    <option value = "Male">Male</option>
                                    <option value = "Female">Female</option>
                                   
                                </select>
                             

                             <button onClick = {this.onButtonClick} className = 'btn btn-dark btn-outline-light  '>Daftar</button>
                             <p className = "">Anda Sudah Memiliki Akun? Login <Link to = "/login" className = "font-weight-bolder text-primary">Disini</Link> </p>
                        </div>

                    </div>
                </div>




            // <div>
            // <Header/>
            // <div className = "container" >
            //     <div className = 'mt-5 justify-content-center row'>
            //     <div className = ' col-sm-auto  card' style = {{backgroundImage: `url(${background})`}} >
            //         <div className = 'card-body '>
                        
            //             <div className = 'border-bottom border-light card-title'>
            //                 <h1 className = "text-light">Create account</h1>
            //             </div>

            //             <form className = "input-group mt-3">
            //                 <input type = "text" className = "form-control" placeholder = "Nama Lengkap" 
            //                     ref = {(input) => {this.nama_lengkap = input}} />
            //             </form>

            //             <form className = 'input-group mt-3'>
            //                 <div className = "input-group-prepend">
            //                     <div className = "input-group-text">
            //                         <Username/>
            //                     </div>
            //                 </div>
            //                 <input type = 'text' className = 'form-control' placeholder = 'username'
            //                     ref = {(input) => {this.username = input}}/>
            //             </form>

            //             <form className = 'input-group mt-3'>
            //                 <input type = 'text' className= 'form-control' placeholder = 'email'
            //                     ref = {(input) => {this.email = input}}/>
            //                 <div className = "input-group-prepend">
            //                     <div className = "input-group-text">@example.com</div>
            //                 </div>
            //             </form>

            //             <form className = 'input-group mt-3'>
            //                 <div className = "input-group-prepend">
            //                     <div className = "input-group-text">
            //                         <Phone/>
            //                     </div>
            //                 </div>
            //                 <input type = 'text' className = 'form-control' placeholder = 'Phone Number'
            //                     ref = {(input) => {this.phone_number = input}}/>
            //             </form>

            //             <form className = 'input-group mt-3'>
            //                 <input type = 'password' className = 'form-control' placeholder = 'password'
            //                     ref = {(input) => {this.password = input}} />
            //             </form>

            //             <div className="form-group mt-3">
                            
            //                     <select className="form-control"
            //                         ref = {(input) => {this.gender = input}} >
            //                         <option value = "Male">Male</option>
            //                         <option value = "Female">Female</option>
                                   
            //                     </select>
            //             </div>

            //             <button onClick = {this.onButtonClick} className = 'btn btn-light btn-outline-dark mt-4 '>Click For Register</button>
            //             <p className = "text-light">Anda Sudah Memiliki Akun? Login <Link to = "/register" className = "font-weight-bolder text-primary">Disini</Link> </p>
            
            //         </div>
            //     </div>
            // </div>
            // </div>
            // </div>
        )
    }
}

export default Register;