import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {updateProfile} from '../../../action/index'
import Swal from 'sweetalert2'

import Header from '../../../components/Header/Header'
import {
    Jumbotron
} from 'react-bootstrap'

import './Profile.css'
import { ArrowBack } from '../../../Asset/Arrow Icon/Icon awesome-arrow-left.png'
import History from '../History/History'
import {orchest} from '../../../1.mp3'






class Profile extends Component{


  state = {
    edit : false,
    profile: []
  }


  refresh = (reload) => {
    document.location.reload(reload)
  }

  uploadAvatar = (id) => {
      const formData = new FormData()
      const image = this.image.files[0] 

      formData.append('image', image)
      formData.append('id', id)

    axios.post('http://localhost:1993/upload/avatar/', formData
    ).then(res => {
      console.log(res.data);
      this.props.updateProfile(this.props.user.id)
      
    })


  }


  onButtonClick = () => {

    const nama_lengkap = this.nama_lengkap.value
    const email = this.email.value
    const gender = this.gender.value
    const phone_number = this.phone_number.value

    axios.patch(
      'http://localhost:1993/update/profile/' + this.props.user.id,
      {
        nama_lengkap,
        email,
        gender,
        phone_number
      }
    ).then(res => {
      console.log(res.data);
      console.log('Upload Berhasil');
      // this.setState({edit: !this.state.edit})
      this.props.updateProfile(this.props.user.id)
      this.closeModalHandler()
      Swal.fire({
        title: 'Berhasil',
        text: 'Data Berhasil Diubah',
        icon: 'success',
        timer: 2000,
        
      })
    }).catch(err =>{
      console.log(err);
      
    })
  }

  getProfile = () => {
    axios.get('http://localhost:1993/customers/profile/' + this.props.user.id)
      .then(res => {
        this.setState({profile : res.data})
        console.log(res.data);
        
      })
  }


  componentDidMount(){
    this.getProfile()
  }



openModalHandler = () => {
  const modal = document.getElementById("profile-modal")
  modal.style.display = "flex"
  console.log("hahaha");
  


}

closeModalHandler = () => {
  document.getElementById("profile-modal").style.display = "none"
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

profilePictureError (){
  document.getElementById("profile-picture").style.display = "none"
  
}
    

    render(){
        if(this.props.user){
          const {nama_lengkap, username, email, phone_number, id, gender, avatar} = this.props.user
          console.log(this.props.user.username)
          const videoPl = orchest
          if(!this.state.edit){
          return(
            <div className = "profile-body" id = "profile-body" >
              
              <div className = "profile-title" id = "profile-title" >
                <img src = {ArrowBack} />
                <h1>Profile</h1>
              </div>

              <div className = "profile-content" id = "profile-content" >
                <div  className ="profile-image" id = "profile-image" onClick = {() => this.image.click()} >
                  <img alt = ""   src = {`http://localhost:1993/customer/avatar/${avatar}`} id = "profile-picture" onError = {this.profilePictureError}  />
                  <h5>klik untuk mengganti foto</h5>
                  <input
                    type = "file"
                    ref ={input => this.image = input}
                    style = {{display : "none"}}
                    accept = "image/*"
                    onChange = {() => {this.uploadAvatar(id)}}
                    />
                                
                </div>

                <div className = "profile-detail" id = "profile-detail" >
                  <h1>Data Diri</h1>
                    <div className = "profile-diri" id = "profile-diri" >
                      <h2>Nama:</h2>
                      <span>{nama_lengkap}</span>
                    </div>
                    <div className = "profile-diri" id = "profile-diri" >
                      <h2>Jenis Kelamin:</h2>
                      <span>{gender}</span>
                    </div>
                    <h1>Data Kontak</h1>
                      <div className = "profile-kontak" id = "profile-kontak" >
                        <h2>No.telpon/Hp</h2>
                        <span>{phone_number}</span>
                      </div>
                      <div className = "profile-kontak" id = "profile-kontak" >
                        <h2>Email</h2>
                        <span>{email}</span>
                      </div>
                      <div className = "profile-detailButton" >
                        <button className = "profile-editButton btn" id = "profile-editButton" onClick = {this.openModalHandler} >Edit</button>
                      </div>
                  </div>
              </div>

              <div className = "profile-modal" id = "profile-modal" >
                <div className = "profile-modalContent" >
                  <h1>Edit Data Diri dan Kontak</h1>
                  <div className = "profile-editForm" >
                    <label>Nama:</label>
                    <input defaultValue = {nama_lengkap} ref = {input => this.nama_lengkap = input} />
                    <label>Jenis Kelamin:</label>
                    <select defaultValue = {gender} ref = {input => this.gender = input}>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    <label>No.telpon/Hp:</label>
                    <input defaultValue = {phone_number} ref = {input => this.phone_number = input} onKeyPress = {(e) => {this.onlyNumber(e)}} maxLength = "14" />
                    <label>Email:</label>
                    <input defaultValue = {email} ref = {input => this.email = input} />
                    <div className = "form-button" > 
                    <button className = "profile-save btn " onClick = {this.onButtonClick} >Simpan</button>
                    <button className = "profile-cancel  btn" id = "profile-cancel" onClick = {this.closeModalHandler} >Batalkan</button>
                    </div>
                  </div>
                </div>
        
              </div>
              
            </div>
              // <div>
              //   <Header/>
              //   <Jumbotron className = "bg-dark">
              //   <div className = "container">
              //     <div className = "row">
              //     <h1 className = "text-light col-sm-auto">Profile</h1>
              //     <h5 className = "text-light col-sm-auto mt-3">ID: {id}</h5>
              //     </div>
              //     <div className = "row">
              //       <div className = "col-sm-auto">
              //         <img src ={`http://localhost:1993/customer/avatar/${avatar}`} alt = "Please Choose your Avatar" className = "text-light" width="200" height="100%" />
              //         <p><h3 className = "text-light">@<a>{username}</a></h3></p>
                      
              //       </div>
              //       <div className = "col-sm">
              //         <ul className = "list-group">
              //           <li className = "list-group-item border-bottom-5 ">Nama Lengkap : {nama_lengkap}</li>
              //           <li className = "list-group-item border-bottom-5">E-mail : {email}</li>
              //           <li className = "list-group-item border-bottom-3">Phone Number : {phone_number}</li>
              //           <li className = "list-group-item border-bottom-3">Gender : {gender}</li>
              //         </ul>
              //         <button  className = "btn btn-outline-light mt-2" onClick = {() => {this.setState({edit: !this.state.edit})}} >Edit Profile</button>
              //       </div>
              //     </div>
              //   </div>
              // </Jumbotron>
              // </div>
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
                      <img src ={`http://localhost:1993/customer/avatar/${avatar}`} alt = "Please Choose Your Avatar" className = "img text-light" width="300" height="300" />
                      <input type="file" className="form-control" ref ={input => this.image = input}/>
                      
                    </div>
                    <div className = "col-sm">
                      <label className="text-light">Nama</label>
                        <input className="form-control" defaultValue = {nama_lengkap} ref = {input => this.nama_lengkap = input} ></input>
                      <label className="text-light">Email</label>
                        <input className="form-control" defaultValue = {email} ref = {input => this.email = input}></input>
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
                  <div className = "row">
                    <div className = "col-sm-auto">
                    
                      <button className = "btn btn-primary mt-3" onClick = {() => {this.uploadAvatar(id)}}>Upload</button>
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



export default connect(mapStateToProps, {updateProfile}) (Profile);