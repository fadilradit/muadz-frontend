import React, {Component} from 'react'
import {Jumbotron} from 'react-bootstrap'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'

import './Checkout.css'
import ArrowBack from '../../../Asset/Arrow Icon/Icon awesome-arrow-left.png'

class Checkout extends Component{

    state = {
        data: {
            nama_lengkap : '',
            phone_number: ''
        },
        dataPro:[],
        pending:[],
        cancel: [],
        paid: [],
        redirec: false
    }

    componentDidMount(){
        this.getCart()
        this.totalHarga()
        this.getCheckOutPending()
        this.getCheckOutCancel()
        this.getCheckOutPaid()
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
        let user_id = this.props.user.id

        axios.get('http://localhost:1993/pendingpayment/' + user_id)
        .then(res => {
            this.setState({pending: res.data})
            console.log(this.state.pending);
            
        })
    }

    getCheckOutCancel = () => {
        let users_id = this.props.user.id

        axios.get('http://localhost:1993/cancelpayment/' + users_id)
        .then(res => {
            this.setState({cancel: res.data})
            console.log(this.state.cancel);
            
            
            
        })
    }

    getCheckOutPaid = () => {
        let users_id = this.props.user.id

        axios.get('http://localhost:1993/paidpayment/' + users_id)
        .then(res => {
            this.setState({paid: res.data})
            console.log(this.state.paid);
            
            
            
        })
    }



    onButtonClick = async () => {
        if (this.state.pending.length > 0) {
            alert('Harap Bayar Transaksi Anda Sebelumnya Terlebih Dahulu')
            this.setRedirect()
        } else if (this.state.cancel.length > 0){
            alert('Transaksi anda sebelumnya telah ditolak, silahkan upload ulang bukti pembayaran sebelumnya')
            this.setRedirect()
        } else if (this.state.paid.length > 0){
            alert('Maaf Belanjaan Anda Sebelumnya Masih dalam Proses')
            this.setRedirect()
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
        }else if(bank === ''){
            alert("Silahkan Pilih Bank Terlebih Dahulu")
        }else if(kurir === ''){
            alert("Silahkan Pilih Jasa Kurir terlebih dahulu")
        }
        
        else{
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
    const hargaTotal = this.totalHarga()

    return(
        <div className = "checkout-body" id = "checkout-body" > 

            <div className = "checkout-title" id = "checkout-title" >
                <img src = {ArrowBack} onClick = {() => {window.history.back()}} />
                <h1>Checkout</h1>
            </div>

            <div className = "content" id = "content" >

                <div className = "data-form" id = "data-form" >

                    <label>Nama Penerima:</label>
                    <input disabled defaultValue = {nama_lengkap} />

                    <label>No. Handphone Penerima:</label>
                    <input disabled defaultValue = {phone_number} />

                    <label>Alamat Pengiriman: </label>
                      <textarea type = "text-area"  placeholder = "Type Your Address Here" ref = {input => {this.alamat = input}}/>
                    
                    <label>Pilih Bank: </label>
                        <select  ref = {input => {this.bank = input}}>
                            <option value = "">-Pilih-</option>
                            <option value = "BRI">BRI</option>
                            <option value = "BNI">BNI</option>
                            <option value = "MANDIRI">MANDIRI</option>
                        </select>

                    <label >Piilih Kurir: </label>
                        <select  ref = {input => {this.kurir = input}}>
                            <option value = "">-Pilih-</option>
                            <option value = "JNE">JNE</option>
                            <option value = "JNT">JNT</option>
                            <option value = "TIKI">TIKI</option>
                        </select>

                </div>

                <div className = "checkoutdetail-body" id = "checkoutdetail-body" >
                    
                <div className = "checkout-detail" id = 'checkout-detail' >
                                <h1>Ringkasan Pemesanan</h1>

                                <table className = 'checkoutdetail-label' id = 'checkoutdetail-label' >

                                    <thead className = "checkouthead-item" >
                                        <tr>
                                            <th>Item</th>
                                            <th>Harga</th>
                                            <th>Jumlah</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>

                                    <tbody className = 'checkout-item' >
                                        {this.dataProduct()}
                                        
                                    </tbody>
                                </table>

                                <div className = "total-pay" id = "total-pay" >
                                    <h2>Total Bayar:</h2>
                                    <h2 className = "total-payment" > Rp.{hargaTotal.toLocaleString('IN')}</h2>
                                </div>

                            <Link className = "btn btn-dark"  id = "pay-button" onClick = {() => {this.onButtonClick()}} >Bayar</Link>

                            </div>
                    



                {/* <table className = "table table-hover">
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
                            </table> */}
                </div>

            </div>
            {this.renderRedirect()}
        </div>










        // <div>
        //     <Jumbotron>
        //         <div className = "container">
        //             <h1>Checkout</h1>
        //             <button className = "btn btn-success mt-2 mb-2" onClick = {() => {this.onButtonClick()}}>Order Now</button>
        //             <Link className = "btn btn-success ml-2 mt-2 mb-2" to = "/">Back To Shop</Link>
        //             <div className = "row">
        //                 <div className = "col-5  mr-5">
        //                     <h3>Data Customer</h3>
        //                     <label className = "mr-1">Nama: </label>
        //                     <input className = "form-control" disabled defaultValue = {nama_lengkap} ref = {input => {this.nama_lengkap = input}}/>
        //                     <label className = "mr-1">No. Tlpon: </label>
        //                     <input className = "form-control" disabled defaultValue = {phone_number} ref = {input => {this.phone_number = input}}/>
        //                     <label className = "mr-1">Alamat: </label>
        //                     <textarea type = "text-area" className = "form-control mb-2" style = {{height: '200px', resize: 'none'}} placeholder = "Type Your Address Here" ref = {input => {this.alamat = input}}/>
        //                     <label className = "mr-1">Pilih Bank: </label>
        //                     <select className = "form-control" ref = {input => {this.bank = input}}>
        //                         <option value = "BCA">BCA</option>
        //                         <option value = "BRI">BRI</option>
        //                         <option value = "BNI">BNI</option>
        //                         <option value = "MANDIRI">MANDIRI</option>
        //                     </select>
        //                     <label className = "mr-1">Piilih Kurir: </label>
        //                     <select className = "form-control" ref = {input => {this.kurir = input}}>
        //                         <option value = "JNE">JNE</option>
        //                         <option value = "JNT">JNT</option>
        //                         <option value = "TIKI">TIKI</option>
        //                     </select>
        //                 </div>
        //                 <div className = "col-5 border border-dark border-7">
        //                     <h3>Product</h3>
        //                     <table className = "table table-hover">
        //                         <thead>
        //                             <tr>
        //                                 <th>Nama</th>
        //                                 <th>Price</th>
        //                                 <th>QTY</th>
        //                                 <th>Total</th>
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                             {this.dataProduct()}
        //                         </tbody>
        //                     </table>
        //                     <h5 className = "font-weight-bold">TOTAL PEMBAYARAN :Rp. {this.totalHarga()}</h5>
        //                 </div>
        //             </div>
                    
                    
        //         </div>
        //     </Jumbotron>
        //     {this.renderRedirect()}
        // </div>
    )
}
    


}

const mapStateToProps = (state) => {
    return{
        user: state.auth
    }
}


export default connect(mapStateToProps)(Checkout);