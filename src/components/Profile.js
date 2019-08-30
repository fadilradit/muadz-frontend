import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

import Header from './Header'
import {
    Jumbotron,
    Button,
    Container,
    Row,
    Col,
    Image,
    ButtonToolbar,
    Modal
} from 'react-bootstrap'
import { statement } from '@babel/template';







class Profile extends Component{


  state = {
    edit : false,
    profile: []
  }


  onButtonClick = () => {

    const nama_lengkap = this.nama_lengkap.value
    const username = this.username.value
    const email = this.email.value
    const gender = this.gender.value
    const phone_number = this.phone_number.value

    axios.patch(
      'http://localhost:1993/update/profile/' + this.props.user.id,
      {
        nama_lengkap,
        username,
        email,
        gender,
        phone_number
      }
    ).then(res => {
      console.log(res.data);
      console.log('Upload Berhasil');
      this.setState({edit: !this.state.edit})
    }).catch(err =>{
      console.log(err);
      
    })
  }

  getProfile = () => {
    axios.get('http://localhost:1993/customers/profile/' + this.props.user.id)
      .then(res => {
        this.state({profile : res.data})
        console.log(res.data);
        
      })
  }


  componentDidMount(){
    this.getProfile()
  }




  
 
  
    

    render(){
        if(this.props.user){
          const {nama_lengkap, username, email, phone_number, id, gender} = this.props.user
          console.log(this.props.user.username)
          if(!this.state.edit){
          return(
              <div>
                <Header/>
                <Jumbotron className = "bg-dark">
                <div className = "container">
                  <div className = "row">
                  <h1 className = "text-light col-sm-auto">Profile</h1>
                  <h5 className = "text-light col-sm-auto mt-3">ID: {id}</h5>
                  </div>
                  <div className = "row">
                    <div className = "col-sm-auto">
                      <img src ="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className = "avatar" width="100%" height="200" />
                      <p><h3 className = "text-light">@<a>{username}</a></h3></p>
                      
                    </div>
                    <div className = "col-sm">
                      <ul className = "list-group">
                        <li className = "list-group-item border-bottom-5 ">Nama Lengkap : {nama_lengkap}</li>
                        <li className = "list-group-item border-bottom-5">E-mail : {email}</li>
                        <li className = "list-group-item border-bottom-3">Phone Number : {phone_number}</li>
                        <li className = "list-group-item border-bottom-3">Gender : {gender}</li>
                      </ul>
                      <button  className = "btn btn-outline-light mt-2" onClick = {() => {this.setState({edit: !this.state.edit})}} >Edit Profile</button>
                    </div>
                  </div>
                </div>
              </Jumbotron>
              </div>
            )
          } else {
            return (
            <div>
              <Header/>
              <Jumbotron className = "bg-dark">
                  <div className = "container">
                  <h1 className = "text-light">Edit Profile</h1>
                  <div className = "row">
                    <div className = "col-sm-auto">
                      <img src ="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className = "avatar" width="100%" height="" />
                      <input type="file" className="form-control" placeholder=""/>
                      
                    </div>
                    <div className = "col-sm">
                      <label className="text-light">Nama</label>
                        <input className="form-control" defaultValue = {nama_lengkap} ref = {input => this.nama_lengkap = input} ></input>
                      <label className="text-light">Email</label>
                        <input className="form-control" defaultValue = {email} ref = {input => this.email = input}></input>
                      <label className="text-light">Username</label>
                        <input className="form-control" defaultValue = {username} ref = {input => this.username = input}></input>
                      <label className="text-light">No Telepon</label>
                      <input className="form-control" defaultValue = {phone_number} ref = {input => this.phone_number = input}></input>
                      <label className="text-light">Gender</label>
                        <select className="form-control" defaultValue = {gender} ref = {input => this.gender = input}>
                                    <option value = "Male">Male</option>
                                    <option value = "Female">Female</option>
                                   
                                </select>
                      <button type = "file" className = "btn btn-outline-light mt-2" onClick = {() => {this.setState({edit: !this.state.edit})}} >Cancel</button>
                      <button type = "file" className = "btn btn-outline-light mt-2 ml-2" onClick = {this.onButtonClick} >Done</button>
                    </div>
                  </div>
                </div>
                </Jumbotron>
            </div>
            )  
        }
        } 
      return( 
        <div>
          <Redirect to = "/" />
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return{
    user: state.auth
  }
}



export default connect(mapStateToProps) (Profile);