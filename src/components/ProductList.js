import React, {Component} from 'react'
import axios from 'axios'
import  {Link} from 'react-router-dom'

import ProductDetail from './ProductDetail'


class ProductList extends Component{



    state = {
        products : []
    }

    componentDidMount(){
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:1993/showproduct')
            .then(res => {
                this.setState({products: res.data})
                console.log(this.state.products);
                
                
            })
    }

     renderList = () => {
        return this.state.products.map(item => {
            return(
                
                    <div className = " card col-5 m-3 border border-5 border-dark card">
                        <img className = " card-img-top"/>
                        <h5 className = "card-title">{item.name_product}</h5>
                        <p className = "card-text">$.{item.price}</p>
                        <p className = "card-text">Category: {item.category_name}</p>
                        <Link to = {'/productdetail/' + item.id}>
                            <button  className = "btn btn-dark" >Detail</button>
                        </Link>
                    </div>

                    
            )
        })
    }

    



    render(){
       
            return(
                <div className = "container mt-3 border border-dark border-8">
                    <div>
                        <h3>Product</h3>
                    </div>
                    <div className = "row col-10-auto">
                        {this.renderList()}
                    </div>
                </div>
            )
        
        
    }

}

export default ProductList;