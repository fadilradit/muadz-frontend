import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
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
    edit : false
  }


  renderEdit = () => {

    const{nama_lengkap, username, email, phone_number, id} = this.props.user
    if(this.state.edit){
      return(
    
                <div className = "container">
                  <div className = "row">
                    <div className = "col-sm-auto">
                      <img src ="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className = "avatar" width="100%" height="200" />
                      
                      <p className = "mt-2"><button className = "btn-sm btn-dark btn-outline-light">Change Photo Profile</button></p>
                    </div>
                    <div className = "col-sm">
                      <ul className = "list-group">
                        <form>
                        <label className = "mb-0" htmlFor = "nama">Nama</label>
                        <input type = "text" className = "list-group-item border-bottom-5 " defaultValue = {nama_lengkap} placeholder = "Nama Lengkap"></input>
                        </form>
                        <form>
                        <label className = "mb-0" htmlFor = "username">Username</label>
                        <input type = "text" className = "list-group-item border-bottom-5 " defaultValue = {username} placeholder = "Username"></input>
                        </form>
                        <form>
                        <label className = "mb-0" htmlFor = "email">E-mail</label>
                        <input type = "text" className = "list-group-item border-bottom-5 " defaultValue = {email} placeholder = "E-mail"></input>
                        </form>
                        <form>
                        <label className = "mb-0" htmlFor = "phone_number">Phone Number</label>
                        <input type = "text" className = "list-group-item border-bottom-5 " defaultValue = {phone_number} placeholder = "Phone Number"></input>
                        </form>
                        
                      </ul>
                      <button type = "file" className = "btn btn-outline-light mt-2"  >Done</button>
                    </div>
                  </div>
                </div>
            
      )

    }

  }

 
  
    

    render(){
        if(this.props.user){
          const {nama_lengkap, username, email, phone_number, id} = this.props.user
          console.log(this.props.user.username)
          if(!this.state.edit){
          return(
              <Jumbotron className = "bg-dark">
                <div className = "container">
                  <h1 className = "text-light">Profile</h1>
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
                        <li className = "list-group-item border-bottom-3">ID : {id}</li>
                      </ul>
                      <button type = "file" className = "btn btn-outline-light mt-2" onClick = {() => {this.setState({edit: !this.state.edit})}} >Edit Profile</button>
                    </div>
                  </div>
                </div>
              </Jumbotron>
            )
          } else {
            return (
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
                      <input className="form-control"></input>
                      <label className="text-light">Email</label>
                      <input className="form-control"></input>
                      <label className="text-light">Username</label>
                      <input className="form-control"></input>
                      <label className="text-light">No Telepon</label>
                      <input className="form-control"></input>
                      <button type = "file" className = "btn btn-outline-light mt-2" onClick = {() => {this.setState({edit: !this.state.edit})}} >Cancel</button>
                    </div>
                  </div>
                </div>
                </Jumbotron>
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