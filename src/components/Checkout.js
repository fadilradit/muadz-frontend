import React, {Component} from 'react'
import {Jumbotron} from 'react-bootstrap'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'

import Header from './Header'
import { async } from 'q';

class Checkout extends Component{

    state = {
        data: {
            nama_lengkap : '',
            phone_number: ''
        },
        dataPro:[],
        pending:[],
        cancel: [],
        redirec: false
    }

    componentDidMount(){
        this.getCart()
        this.totalHarga()
        this.getCheckOutPending()
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


    getCart = () => {
        const customer_id = this.props.user.id
        

        axios.get('http://localhost:1993/getcart/checkout/' + customer_id)
        .then(res => {
            this.setState({data: res.data[0]})
            this.setState({dataPro: res.data})
            console.log(this.state.data);
            console.log(this.state.dataPro);
            
            
        })
    }

    getCheckOutPending = () => {
        const user_id = this.props.user.id

        axios.post('http://localhost:1993/pendingpayment/' + user_id)
        .then(res => {
            this.setState({pending: res.data})
        })
    }

    getCheckOutCancel = () => {
        let users_id = this.props.match.params.users_id

        axios.get('http://localhost:2019/cancelpayment/' + users_id)
        .then(res => {
            this.setState({cancel: res.data})
            
            
        })
    }

    onButtonClick = async () => {
        if (this.state.pending.length > 0) {
            alert('Harap Bayar Terlebih Dahulu')
            this.setRedirect()
        } else if (this.state.cancel.length > 0){
            alert('Transaksi anda telah ditolak, silahkan upload ulang bukti pembayaran')
            this.setRedirectcancel()
        } else if (this.state.dataPro.length === 0){
            alert('Harap Belanja Dahulu')
        }
        else{
        const customer_id = this.props.user.id
        const admin_id = 2
        const bank = this.bank.value
        const kurir = this.kurir.value
        const alamat = this.alamat.value
        const total_harga = this.totalHarga()
        const order_status = 'pending'

        console.log(customer_id);
        console.log(admin_id);
        console.log(bank);
        console.log(kurir);
        console.log(alamat);
        console.log(total_harga);
        console.log(order_status);

        if(alamat === ''){
            alert("Silahkan Lengkapi Data")
        }else{
            const resOrder = await axios.post('http://localhost:1993/addcheckout', {
            customer_id,
            admin_id,
            bank,
            kurir,
            alamat,
            total_harga,
            order_status
        })

        console.log((resOrder));
        
        const arrayCart = []
        const carts = this.state.dataPro
        console.log(carts);

        for(let i = 0; i < carts.length; i++) {
            arrayCart.push([carts[i].product_id, carts[i].qty, resOrder.data[0].id])
        }

        const resOrderDetail = await axios.post('http://localhost:1993/orderdetail', {arrayCart})
        console.log(resOrderDetail);

        await axios.delete(
            `http://localhost:1993/hapuscart/${this.props.user.id}`)
            .then(res => {
                console.log(res.data);
                alert('Berhasil')
                this.setRedirect()

                
            })
        

        }

        }

        


        
        
    }

    totalHarga = () => {
        var total = 0

        for(var i = 0 ; i < this.state.dataPro.length ; i++){
            const jumlah = this.state.dataPro[i].qty*this.state.dataPro[i].price
            total = total + jumlah
        }
        return(
            total
        )
    }

    

    dataProduct = () => {
        return this.state.dataPro.map( item => {
            return(
                <tr>
                    <td>{item.name_product}</td>
                    <td>Rp.{item.price.toLocaleString('IN')}</td>
                    <td>{item.qty}</td>
                    <td>Rp.{(item.price*item.qty).toLocaleString('IN')}</td>
                </tr>
            )
        })
    }


render(){
    const nama_lengkap = this.props.user.nama_lengkap
    const phone_number = this.props.user.phone_number

    return(
        <div>
            <Header/>
            <Jumbotron>
                <div className = "container">
                    <h1>Checkout</h1>
                    <button className = "btn btn-success mt-2 mb-2" onClick = {() => {this.onButtonClick()}}>Order Now</button>
                    <Link className = "btn btn-success ml-2 mt-2 mb-2" to = "/">Back To Shop</Link>
                    <div className = "row">
                        <div className = "col-5  mr-5">
                            <h3>Data Customer</h3>
                            <label className = "mr-1">Nama: </label>
                            <input className = "form-control" disabled defaultValue = {nama_lengkap} ref = {input => {this.nama_lengkap = input}}/>
                            <label className = "mr-1">No. Tlpon: </label>
                            <input className = "form-control" disabled defaultValue = {phone_number} ref = {input => {this.phone_number = input}}/>
                            <label className = "mr-1">Alamat: </label>
                            <textarea type = "text-area" className = "form-control mb-2" placeholder = "Type Your Address Here" ref = {input => {this.alamat = input}}/>
                            <label className = "mr-1">Pilih Bank: </label>
                            <select className = "form-control" ref = {input => {this.bank = input}}>
                                <option value = "BCA">BCA</option>
                                <option value = "BRI">BRI</option>
                                <option value = "BNI">BNI</option>
                                <option value = "MANDIRI">MANDIRI</option>
                            </select>
                            <label className = "mr-1">Piilih Kurir: </label>
                            <select className = "form-control" ref = {input => {this.kurir = input}}>
                                <option value = "JNE">JNE</option>
                                <option value = "JNT">JNT</option>
                                <option value = "TIKI">TIKI</option>
                            </select>
                        </div>
                        <div className = "col-5 border border-dark border-7">
                            <h3>Product</h3>
                            <table className = "table table-hover">
                                <thead>
                                    <tr>
                                        <th>Nama</th>
                                        <th>Price</th>
                                        <th>QTY</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.dataProduct()}
                                </tbody>
                            </table>
                            <h5 className = "font-weight-bold">TOTAL PEMBAYARAN :Rp. {this.totalHarga()}</h5>
                        </div>
                    </div>
                    
                    
                </div>
            </Jumbotron>
            {this.renderRedirect()}
        </div>
    )
}
    


}

const mapStateToProps = (state) => {
    return{
        user: state.auth
    }
}


export default connect(mapStateToProps)(Checkout);