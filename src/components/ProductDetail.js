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

import Header from './Header'

import koko1 from '../Image/koko.jpg'
import koko2 from '../Image/koko2.jpg'
import axios from '../config/axios';







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
        console.log(res.data);
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
            document.location.reload(true)
          })
        }else {
          axios.post('http://localhost:1993/addtocart',
          {
            customer_id : user_id,
            product_id: id,
            qty,
          }).then(res => {
            alert('Product Berhasil Ditambahkan Kedalam Cart')
            document.location.reload(true)
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
          <div>
            <Header/>
            {this.renderRedirect()}
            <div className = "card col-6 mt-5 mb-5 mx-auto border border-dark border-8">
            <img className = "card-img-top mt-2" src = {`http://localhost:1993/getproduct/image/${product_image}`} width = "300" height = "400" />
            <div className = "card-body">
              <h3>{name_product}</h3>
              <p className = "card-text">{description}</p>
              <p className = "card-text">Rp. {price}</p>
              <button className = "btn btn-dark"  onClick = {() => {this.addToCart(this.state.products)}} >Add To Cart</button>
            </div>
          </div>
          </div>

        )
    }
}

const mapStateToProps = state => {
  return{
    user:state.auth
  }
}

export default connect(mapStateToProps)(ProductDetail);