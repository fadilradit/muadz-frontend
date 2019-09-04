import React,  { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import HeaderAdmin from './HeaderAdmin'
import {
    Jumbotron
} from 'react-bootstrap'


class ManageTransaction extends Component{

    state = {
        checkout: []
    }

    ConfirmPayment = (id) => {
        axios.get('http://localhost:1993/confirmpayment/'+id)
        .then(
            document.location.reload(true),
            this.getCheckout()
        )
    }
    

    CancelPayment = (id) => {
        axios.delete('http://localhost:1993/checkout/receiptorder/'+id)
        .then(
            document.location.reload(true),
            this.getCheckout()
        )
    }

    componentDidMount(){
        this.getCheckout()
        ;
        
    }

    getCheckout = () => {
        axios.get('http://localhost:1993/checkoutapagitu')
        .then(res=>{
            this.setState({checkout:res.data})
            console.log(this.state.checkout)
        }
                
        )
        
    }

    renderList = () => {
        return this.state.checkout.map(item => {
            if(item.image_checkout !== null){
                return (
                    <tr>
                        <th scope="col">{item.order_time}</th>
                        <th scope="col">Rp. {item.total_harga.toLocaleString('IN')}</th>
                        <th scope="col">{item.order_status}</th>
                        <th scope="col"><img src ={`http://localhost:1993/checkout/receipt/${item.image_checkout}`} width = "200" height = "100"/></th>
                        <th scope="col">
                            {item.order_status !== 'success' ?
                            <div>
                                <button className="btn btn-primary" onClick={() => {this.ConfirmPayment(item.id)}}>Accept</button>
                                <button className="btn btn-primary ml-2" onClick={() => {this.CancelPayment(item.id)}}>Decline</button>
                            </div> :
                            <h6>Selesai</h6>
                            }
                        </th>
                    </tr>
                ) 
            } 
            
        })
    }

render(){
    return(
        <div>
            <HeaderAdmin/>
            <Jumbotron className = "">
                        <div className = "container">
                            <h1>Order</h1>
                            <table className = "table table-hover mb-5 text-center">
                                <thead>
                                    <tr>
                                        <th>Order Date</th>
                                        <th>Harga</th>
                                        <th>Status</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {this.renderList()}
                                </tbody>
                            </table>
                        </div>
                    </Jumbotron>
        </div>
    )
}

}

export default ManageTransaction;