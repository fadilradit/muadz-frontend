import React, {Component} from 'react'
import {Jumbotron} from 'react-bootstrap'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'

import Header from '../../../components/Header/Header'
import './Cart.css'
import PlusCounter from '../../../Asset/Plus Counter/Group 12.png'
import MinCounter from '../../../Asset/Min Counter/Group 13.png'
import DeleteIcon from '../../../Asset/Trash Icon/Icon feather-trash-2.png'
import ArrowBack from '../../../Asset/Arrow Icon/Icon awesome-arrow-left.png'

class Cart extends Component{

    state = {
        cart: [],
        cartUser: []
    }

    componentDidMount(){
        this.getCart()
        
    }


    getCart = () => {

        axios.get(
            'http://localhost:1993/getcart'
          ).then(res => {
            this.setState({cart: res.data})
            console.log(this.state.cart);
            this.cartUser()
            
        })
        
    }

    cartUser = () => {
        const cartFilter = this.state.cart.filter(cart => {
            if(cart.customer_id === this.props.user.id){
                return cart
            }
        })
        this.setState({cartUser: cartFilter})
        console.log(this.state.cartUser);
        
    }


    minQty = (cart) => {
        const user_id = this.props.user.id
        const { product_id } = cart

        axios.get(
            'http://localhost:1993/cart/'+user_id+'/'+product_id
            ).then(res => {
                const totalQty = parseInt(res.data[0].qty) -1
                console.log(res.data);

                if(totalQty === 0){
                    axios.delete('http://localhost:1993/cart/'+res.data[0].id)
                    .then(res => {
                        this.getCart()
                    })
                }else{
                    axios.patch('http://localhost:1993/cart/'+res.data[0].id,
                    {
                        qty:totalQty
                    }).then(res => {
                        console.log(res.data);
                        this.getCart()
                    })
                }
            })
    }

    addQty = (cart) => {
        const user_id = this.props.user.id
        const { product_id } = cart

        axios.get(
            'http://localhost:1993/cart/'+user_id+'/'+product_id
            ).then(res => {
                const totalQty = parseInt(res.data[0].qty) + 1
                axios.patch('http://localhost:1993/cart/'+res.data[0].id,
                {
                    qty:totalQty
                }).then(res => {
                    this.getCart()
                })
            })
    }

    deleteCart = (id) => {
        const user_id = this.props.user.id
        const { product_id } = id

        axios.get(
            'http://localhost:1993/cart/'+user_id+'/'+product_id
            ).then(res => {
                axios.delete('http://localhost:1993/cart/'+res.data[0].id)
                    .then(res => {
                        this.getCart()
                    })
            })


        axios.delete('http://localhost:1993/cart/'+id)
        .then(res => {
            console.log(res.data);
            this.getCart()
        })
    }

    totalProduct = () => {
        const {cartUser} = this.state
        var total = 0
        for(var i = 0 ; i < cartUser.length; i++ ){
            const productQTY = cartUser[i].qty
            total = total + productQTY
        }

        return total;

    }

    totalPrice = () => {
        const {cartUser} = this.state
        var total = 0
        for(var i = 0 ; i < cartUser.length; i++ ){
            const totalPrice = cartUser[i].qty*cartUser[i].price
            total = total + totalPrice
        }

        return total.toLocaleString('IN');
    }


    renderCart = () => {
        console.log(this.state.cartUser);
        return this.state.cartUser.map(item => {
            return(

                <div className = 'cart-item' >

                    <div className = 'cart-image' id = 'cart-image'>
                        <img  src ={`http://localhost:1993/getproduct/image/${item.product_image}`} />
                    </div>

                    <div className = 'cart-label' id = 'cart-label' >

                        <div className = 'label-text' id = 'label-text'  >

                            <div className = 'cart-name' >{item.name_product}</div>
                            <div className = 'cart-price' id = 'cart-price'>Rp.{item.price.toLocaleString('IN')}</div> 
                        
                        </div>

                        <div className = 'label-counter' id = 'label-counter' >

                            <img src = {DeleteIcon} className = 'delete-cart' id = 'delete-cart' onClick = {() => {this.deleteCart(item)} } />
                            <img src = {MinCounter} className = 'min-counter' id = 'min-counter' onClick = {()=>{this.minQty(item)}} />
                            <h1>{item.qty}</h1>
                            <img src = {PlusCounter} className = 'plus-counter' id = 'plus-counter' onClick = {()=>{this.addQty(item)}} />

                        </div>
                           
                    </div>

                </div>



                // <tr>
                //     <td>{item.name_product}</td>
                //     <td>
                //     <img className = "card-img-top mt-2" src = {`http://localhost:1993/getproduct/image/${item.product_image}`} width = "150" height = "150" />
                //     </td>
                //     <td>{item.category_name}</td>
                //     <td>Rp.{item.price.toLocaleString('IN')}</td>
                //     <td>{item.qty}</td>
                //     <td>Rp.{(item.qty*item.price).toLocaleString('IN')}</td>
                //     <td>
                //     <img className='' style={{width: 15, height: 15}} alt='' src='https://image.flaticon.com/icons/svg/148/148782.svg' onClick = {()=>{this.minQty(item)}}/>
                //     <img className='ml-3' style={{width: 15, height: 15}} alt='' src='https://image.flaticon.com/icons/svg/148/148781.svg' onClick = {()=>{this.addQty(item)}} />
                    
                //     </td>
                // </tr>
            )
        })
    }


    render(){
        this.totalProduct()
        if(this.state.cartUser.length !== 0){
            return(

                <div className = 'cart-body' id = 'cart-body' >

                    <div className = 'cart-title' id = 'cart-title' >
                        <img src = {ArrowBack} onClick = {() => {window.history.back()}} />
                        <h1>Keranjang</h1>
                    </div>

                    <div className = 'content' id = 'content' >

                        <div className ='cart-list' id = 'cart-list' >
                            {this.renderCart()}
                        </div>

                        <div className = 'detail-body' id = 'detail-body'>
                            <div className = "cart-detail" id = 'cart-detail' >
                                <h1>Detail</h1>

                                <div className = 'detail-label' id = 'detail-label' >
                                    <div className = 'total-item' >
                                        <h2>Total Barang</h2>
                                        <h2>{this.totalProduct()}</h2>
                                    </div>
                                    <div className = 'total-item' >
                                        <h2>Total Harga</h2>
                                        <h2>Rp.{this.totalPrice()}</h2>
                                    </div>
                                </div>

                                <div className = 'price-total' id = 'price-total'>
                                    <h2>TOTAL</h2>
                                    <h2>Rp.{this.totalPrice()}</h2>
                                </div>



                            <Link className = "btn btn-dark" to = "/checkout">Beli</Link>

                            </div>
                        </div>

                        

                    </div>
                    
                </div>


                // <div>
                    
                //     <Jumbotron className = "">
                //         <div className = "container">
                //             <h1>Cart</h1>
                //             <Link className = "btn btn-danger" to = "/checkout">Checkout</Link>
                //             <table className = "table table-hover mb-5 text-center">
                //                 <thead>
                //                     <tr>
                //                         <th>Name</th>
                //                         <th>Image</th>
                //                         <th>Category</th>
                //                         <th>Price</th>
                //                         <th>Qty</th>
                //                         <th>Total</th>
                //                         <th>Action</th>
                //                     </tr>
                //                 </thead>
                //                 <tbody>
                //                     {this.renderCart()}
                //                 </tbody>
                //             </table>
                //         </div>
                //     </Jumbotron>
    
                // </div>
            )
        }return (
            <div>
                <Header/>
                <div className = "col-5 mt-5 mx-auto">
                    <h4>Anda Belum Memiliki Product Yang Disimpan Ke Cart</h4>
                    <Link to = "/" className = "btn btn-danger" >Ayo Belanja!!!</Link>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        user : state.auth
    }
}


export default connect(mapStateToProps)(Cart);