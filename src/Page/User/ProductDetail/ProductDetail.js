import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {
    Jumbotron,
    Button,
    Container,
    Row,
    Col,
    Image
} from 'react-bootstrap'

import './ProductDetail.css'

import Header from '../../../components/Header/Header'

import koko1 from '../../../Image/koko.jpg'
import koko2 from '../../../Image/koko2.jpg'
import axios from '../../../config/axios';
import CartLogo from '../../../Asset/CartLogo/Icon awesome-cart-plus.png'
import ArrowBack from '../../../Asset/Arrow Icon/Icon awesome-arrow-left.png'







class ProductDetail extends Component{

  state = {
    products: [],
    redirect: false
  }

  refresh = (reload) => {
    document.location.reload(reload)
  }


  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if(this.state.redirect){
      return <Redirect to = '/login' />
    }
  }

  componentDidMount(){
    let pro_id = this.props.match.params.products_id

    axios.get('http://localhost:1993/showproductdetail/' + pro_id)
      .then(res => {
        this.setState({products: res.data[0]})
        console.log(res);
        console.log(this.state.products);
        
      })
  }

  addToCart = () => {
    const user_id = this.props.user.id
    const id = this.state.products.id
    const qty = 1
    console.log(user_id);
    console.log(id);
    console.log(qty);
    

     if(user_id !== ''){
      axios.get(
        'http://localhost:1993/cart/'+user_id+'/'+id
      ).then(res => {
        console.log(res.data);

        if(res.data.length > 0){
          const totalQty = parseInt(res.data[0].qty) + (qty)
          axios.patch('http://localhost:1993/cart/' + res.data[0].id,
          {
            qty : totalQty
          }).then(res => {
            alert('Quantity Sudah Ditambah')
            
          })
        }else {
          axios.post('http://localhost:1993/addtocart',
          {
            customer_id : user_id,
            product_id: id,
            qty,
          }).then(res => {
            alert('Product Berhasil Ditambahkan Kedalam Cart')
            
          })
        }
        
      })
    } if(user_id === ''){
      alert("Anda Belum Login!!! Silahkan Login Untuk Melanjutkan")
      this.setRedirect()

     }
  }




  
    



    render(){
      var {name_product,description,price,category_name, product_image} = this.state.products
      console.log(typeof(price));
      
        return(
          <div className = 'productdetail-mainbody' >
            <div  className='arrow-back'>
              <img src = {ArrowBack} onClick = {() => {window.history.back()}}  />
            </div>
            
            <div className = 'productdetail-body' >
            
            <div className = 'product-picture'>
              <img src = {`http://localhost:1993/getproduct/image/${product_image}`} />
            </div>

            <div className = 'product-label'>
              
              <h1 className = "product-name" >{name_product}</h1>
              <h1 className = 'product-category'>{category_name}</h1>
              <h1 className = 'product-price' >Rp.{price}</h1>
              <div className = 'product-description' >
                <label>Description: </label>
                <h1 className = 'description-text' >{description}</h1>
              </div>
              

              <div className = 'cart-button' onClick = {() => {this.addToCart(this.state.products)}} >
                <button><img src = {CartLogo}  /> Add To Cart</button>
              </div>
            
            </div>

          </div>
          </div>
          
          // <div>
            
          //   {this.renderRedirect()}
          //   <div className = "card col-6 mt-5 mb-5 mx-auto border border-dark border-8">
          //   <img className = "card-img-top mt-2" src = {`http://localhost:1993/getproduct/image/${product_image}`} width = "300" height = "400" />
          //   <div className = "card-body">
          //     <h3>{name_product}</h3>
          //     <p className = "card-text">{description}</p>
          //     <p className = "card-text">Rp. {price}</p>
          //     <button className = "btn btn-dark"  onClick = {() => {this.addToCart(this.state.products)}} >Add To Cart</button>
          //   </div>
          // </div>
          // </div>

        )
    }
}

const mapStateToProps = state => {
  return{
    user:state.auth
  }
}

export default connect(mapStateToProps)(ProductDetail);