import React, {Component} from 'react'
import {Jumbotron} from 'react-bootstrap'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'

import Header from '../../../components/Header/Header'

import './OrderList.css'
import ArrowBack from '../../../Asset/Arrow Icon/Icon awesome-arrow-left.png'
import CopyIcon from '../../../Asset/Copy Icon/Path 9.png'
import FileImage from '../../../Asset/File Image/Path 14.png'
import Dollar from '../../../Asset/Dollar/dollar.png'
import { Alert } from 'bootstrap'


class OrderList extends Component{


    state = {
        
        checkout: [],
        redirect: false,
        imageUpload: FileImage
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={'/orderlist'} />
        }
    }

    

    componentDidMount(){
        this.getCheckOut()
    }

    getCheckOut = () => {
        // const customer_id = this.props.user.id

        axios.get('http://localhost:1993/getcheckout/orderlist/' + this.props.user.id)
        .then(res => {
            const filtered = res.data.filter(item =>{
                return item.order_status !== 'success'
            })
            console.log(res.data);
            this.setState({checkout: filtered})
            console.log(this.state.checkout);
            
            
        })
    }

    refresh = (reload) => {
        document.location.reload(reload)
      }

    deleteOrder = (id) => {

        axios.delete('http://localhost:1993/hapusorder/' + id)
        .then(res => {
            console.log(res.data);
            alert('Orderan Anda Telah Di Hapus')
            this.refresh()
            
        })
    }

    uploadImage = (id) => {
        const formData = new FormData()
        const image = this.image.files[0]
        console.log(image);
        

        if(image === undefined){
            Swal.fire({
                title: 'Ooppss!!',
                text: 'Harap Pilih Bukti Pembayaran yang Akan Diupload',
                icon: 'Warning'
                
              })
        }else{
            formData.append('image', image)
        formData.append('id', id)

        axios.post('http://localhost:1993/checkout/receipt', formData
        ).then(res=>{
            Swal.fire({
                title: 'Berhasil',
                text: 'Bukti Pembayaran Berhasil Diupload',
                icon: 'success'
                
              })
            console.log(res.data);
            this.setRedirect()
            document.location.reload(true)
        })
        }
        
        // formData.append('image', image)
        // formData.append('id', id)

        // axios.post('http://localhost:1993/checkout/receipt', formData
        // ).then(res=>{
        //     alert('Gambar berhasil di upload')
        //     console.log(res.data);
        //     this.setRedirect()
        //     document.location.reload(true)
        // })
    }

    renderList2 = () => {
        return this.state.checkout.map(item => {
            if(item.customer_id === this.props.user.id){
               if(item.image_checkout === null){
                return(
                    <div className = "mt-5">
                    <h5 className = "text-danger">Silahan Upload Bukti Pembayaran Dengan No. ID:{item.id}</h5>
                    <img src ={`http://localhost:1993/checkout/receipt/${item.image_checkout}`} width = "200" height = "100" alt = "Photo"/>
                    <input type = "file" ref = {input => {this.image = input}} />
                    <button className = "btn btn-primary" onClick = {() => {this.uploadImage(item.id)}}>Upload</button>
                </div>
                )
               }else if(item.order_status === 'paid'){
                   return(
                    <div className = "mt-5">
                    <h5>Menunggu Konfirmasi Order Dengan No.ID: {item.id}</h5>
                    <img src ={`http://localhost:1993/checkout/receipt/${item.image_checkout}`} width = "200" height = "200"  />
                   
                </div>
                   )
               }
            }
        })
    }

    photoHandler = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if(reader.readyState === 2){
                this.setState({imageUpload: reader.result})
            }
        }
        reader.readAsDataURL(e.target.files[0])

        
    }

    cobahandler = () => {
        const image = this.image.files[0]
        console.log(image);
    }

    renderList = () => {
        return this.state.checkout.map(item => {
            console.log(item.total_harga);
            const {imageUpload} = this.state
            if(item.customer_id === this.props.user.id && item.order_status !== 'success' && item.image_checkout === null){
                return(
                    <div className = "payment-detail" id = "payment-detail" >

                                <div className = "payment-bank" id = "payment-bank"  >
                                    <h1>Transer Bank</h1>
                                    <h1>{item.bank}</h1>
                                </div>

                                <div className = "payment-rekening" id = "payment-rekening" >
                                    <div className = "rekening-detail" id = "rekening-detail" >
                                        <h2>Nomor Rekening</h2>
                                        <h1>xxx xxx xxxx</h1>
                                        <h2>PT. Muadz</h2>
                                    </div>

                                    <div className = "rekening-copy" id = "rekening-copy" >
                                        <img src = {CopyIcon}/>&nbsp;
                                        <h1>Salin</h1>
                                    </div>
                                </div>
                                <div className = "payment-total" id = "payment-total" >
                                    <div className = "payment-totaldetail" id = "payment-totaldetail" >
                                        <h2>Total Pembayaran</h2>
                                        <h1>Rp.{item.total_harga.toLocaleString('IN')}</h1>
                                    </div>
                                    <div className = "payment-kurir" id = "payment-kurir" >
                                        <h2>Jasa Pengiriman</h2>
                                        <h1>{item.kurir}</h1>
                                    </div>
                                </div>
                                <div className = "payment-info" id = "payment-info" >
                                    <h1>Cara Pembayaran</h1>
                                    <h2>1.Bayar sesuai total harga yang tertera di atas.</h2>
                                    <h2>2.Upload bukti pembayaran.</h2>
                                </div>
                                <div className = "payment-upload" id = "payment-upload" >
                                    <div className = "payment-img" >
                                        <img src = {imageUpload} />
                                    </div>
                                    
                                    <div className = "payment-button" >
                                        <input
                                            type = "file"
                                            ref = {input => this.image = input}
                                            style = {{display : "none"}}
                                            onChange = {this.photoHandler}
                                            accept = "image/*"
                                        />
                                        <button className = "pick-file btn"  onClick = {() => this.image.click()} >Pilih File</button>
                                        <button className = "upload-button btn "  onClick = {() => {this.uploadImage(item.id)}} >Upload</button>
                                    </div>
                                    
                                </div>
                                

                            </div>


                    


                    // <tr>
                    // <td>{item.id}</td>
                    // <td>{item.bank}</td>
                    // <td>Rp.{item.total_harga.toLocaleString('IN')}</td>
                    // <td>{item.kurir}</td>
                    // <td>{item.order_status}</td>
                    // <td><input type = "file" ref = {input => {this.image = input}} /></td>
                    // <td><button className = "btn btn-primary mr-3" onClick = {() => {this.uploadImage(item.id)}}>Upload</button>
                    //     <button className = "btn btn-danger" onClick = {() => {this.deleteOrder(item.id)}}>Delete</button>
                    // </td>
                    // </tr>
                )
            }else if(item.customer_id === this.props.user.id && item.order_status !== 'success' && item.image_checkout !== null){
                return(
                    <div className = "payment-detail" id = "payment-detail" >

                                <div className = "payment-bank" id = "payment-bank"  >
                                    <h1>Transer Bank</h1>
                                    <h1>{item.bank}</h1>
                                </div>

                                <div className = "payment-rekening" id = "payment-rekening" >
                                    <div className = "rekening-detail" id = "rekening-detail" >
                                        <h2>Nomor Rekening</h2>
                                        <h1>xxx xxx xxxx</h1>
                                        <h2>PT. Muadz</h2>
                                    </div>

                                    {/* <div className = "rekening-copy" id = "rekening-copy" >
                                        <img src = {CopyIcon}/>&nbsp;
                                        <h1>Salin</h1>
                                    </div> */}
                                </div>
                                <div className = "payment-total" id = "payment-total" >
                                    <div className = "payment-totaldetail" id = "payment-totaldetail" >
                                        <h2>Total Pembayaran</h2>
                                        <h1>Rp.{item.total_harga.toLocaleString('IN')}</h1>
                                    </div>
                                    <div className = "payment-kurir" id = "payment-kurir" >
                                        <h2>Jasa Pengiriman</h2>
                                        <h1>{item.kurir}</h1>
                                    </div>
                                </div>
                                <div className = "payment-info" id = "payment-info" >
                                    <h1>Cara Pembayaran</h1>
                                    <h2>1.Bayar sesuai total harga yang tertera di atas.</h2>
                                    <h2>2.Upload bukti pembayaran.</h2>
                                </div>
                                <div className = "payment-upload" id = "payment-upload" >
                                    <div className = "payment-img" >
                                        <img src = {`http://localhost:1993/checkout/receipt/${item.image_checkout}`} />
                                    </div>

                                    <div className = "payment-message" >
                                        <h1>Menunggu konfirmasi pembayaran anda</h1>
                                    </div>
                                    
                                    {/* <div className = "payment-button" >
                                        <input
                                            type = "file"
                                            ref = {input => this.image = input}
                                            style = {{display : "none"}}
                                            onChange = {this.photoHandler}
                                            accept = "image/*"
                                        />
                                        <button className = "pick-file btn"  onClick = {() => this.image.click()} >Pilih File</button>
                                        <button className = "upload-button btn "  onClick = {() => {this.uploadImage(item.id)}} >Upload</button>
                                    </div> */}
                                    
                                </div>
                                

                            </div>





                    // <tr>
                    // <td>{item.id}</td>
                    // <td>{item.bank}</td>
                    // <td>Rp.{item.total_harga.toLocaleString('IN')}</td>
                    // <td>{item.kurir}</td>
                    // <td>{item.order_status}</td>
                    // <td><img src ={`http://localhost:1993/checkout/receipt/${item.image_checkout}`} width = "100" height = "100"  /></td>
                    // <td>Menunggu konfirmasi</td>
                    // </tr>
                )
            }
        })
    }

    render(){
        
        if(this.state.checkout.length > 0){
            return this.state.checkout.map(item => {
                if(item.order_status !== "success" && item.customer_id == this.props.user.id){
                    return(
                        <div className = "payment-body"  id = "payment-body"  >

                            <div className = "payment-title" id = "payment-title" >
                                <img src = {ArrowBack} onClick = {() => {window.history.back()}} />
                                <h1>Payment</h1>
                            </div>

                            {this.renderList()}

                            

                        </div>



                        // <div>
                        //     <Header/>
                        //     <Jumbotron className = "">
                        //             <div className = "container">
                        //                 <h1>Order</h1>
                        //                 <table className = "table table-hover mb-5 text-center">
                        //                     <thead>
                        //                         <tr>
                        //                             <th>No.ID</th>
                        //                             <th>Bank</th>
                        //                             <th>Harga</th>
                        //                             <th>Kurir</th>
                        //                             <th>Status</th>
                        //                             <th>Photo</th>
                        //                             <th>Action</th>
                        //                         </tr>
                        //                     </thead>
                        //                     <tbody>
                        //                        {this.renderList()}
                        //                     </tbody>
                        //                 </table>
            
                                        
                        //             </div>
                        //         </Jumbotron>
                        //         {this.renderRedirect()}
                        // </div>
                    )
                }
            })
        }else {
            return (
                <div className = "payment-body2" id = "payment-body2" >
                
                    <img src = {Dollar} />
                    <p>Silahkan Belanja Terlebih Dahulu</p>

                </div>
            )
        }
        
    }

}

const mapStateToProps = state => {
    return{
        user : state.auth
    }
}


export default connect(mapStateToProps)(OrderList);