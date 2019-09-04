import React, {Component} from 'react'
import {Jumbotron} from 'react-bootstrap'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'

import Header from './Header'

class OrderList extends Component{


    state = {
        
        checkout: [],
        redirect: false
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
            console.log(res.data);
            this.setState({checkout: res.data})
            console.log(this.state.checkout);
            
            
        })
    }

    uploadImage = (id) => {
        const formData = new FormData()
        const image = this.image.files[0]
        console.log(image);
        
        
        formData.append('image', image)
        formData.append('id', id)

        axios.post('http://localhost:1993/checkout/receipt', formData
        ).then(res=>{
            alert('Gambar berhasil di upload')
            console.log(res.data);
            this.setRedirect()
            document.location.reload(true)
        })
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

    renderList = () => {
        return this.state.checkout.map(item => {
            if(item.customer_id === this.props.user.id && item.order_status !== 'success'){
                return(
                    <tr>
                    <td>{item.id}</td>
                    <td>{item.bank}</td>
                    <td>Rp.{item.total_harga.toLocaleString('IN')}</td>
                    <td>{item.kurir}</td>
                    <td>{item.order_status}</td>
                    </tr>
                )
            }
        })
    }

    render(){
        
        
        return(
            <div>
                <Header/>
                <Jumbotron className = "">
                        <div className = "container">
                            <h1>Order</h1>
                            <table className = "table table-hover mb-5 text-center">
                                <thead>
                                    <tr>
                                        <th>No.ID</th>
                                        <th>Bank</th>
                                        <th>Harga</th>
                                        <th>Kurir</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {this.renderList()}
                                </tbody>
                            </table>

                            {this.renderList2()}
                        </div>
                    </Jumbotron>
                    {this.renderRedirect()}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        user : state.auth
    }
}


export default connect(mapStateToProps)(OrderList);