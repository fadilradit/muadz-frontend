import React, {Component} from 'react'
import {Jumbotron} from 'react-bootstrap'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'

import Header from './Header'


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
        axios.delete('http://localhost:1993/cart/'+id)
        .then(res => {
            this.getCart()
        })
    }


    renderCart = () => {
        return this.state.cartUser.map(item => {
            return(
                <tr>
                    <td>{item.name_product}</td>
                    <td>
                    <img className = "card-img-top mt-2" src = {`http://localhost:1993/getproduct/image/${item.product_image}`} width = "150" height = "150" />
                    </td>
                    <td>{item.category_name}</td>
                    <td>Rp.{item.price.toLocaleString('IN')}</td>
                    <td>{item.qty}</td>
                    <td>Rp.{(item.qty*item.price).toLocaleString('IN')}</td>
                    <td>
                    <img className='' style={{width: 15, height: 15}} alt='' src='https://image.flaticon.com/icons/svg/148/148782.svg' onClick = {()=>{this.minQty(item)}}/>
                    <img className='ml-3' style={{width: 15, height: 15}} alt='' src='https://image.flaticon.com/icons/svg/148/148781.svg' onClick = {()=>{this.addQty(item)}} />
                    
                    </td>
                </tr>
            )
        })
    }


    render(){
        if(this.state.cartUser.length !== 0){
            return(
                <div>
                    <Header/>
                    <Jumbotron className = "">
                        <div className = "container">
                            <h1>Cart</h1>
                            <Link className = "btn btn-danger" to = "/checkout">Checkout</Link>
                            <table className = "table table-hover mb-5 text-center">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderCart()}
                                </tbody>
                            </table>
                        </div>
                    </Jumbotron>
    
                </div>
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