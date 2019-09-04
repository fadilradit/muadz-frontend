import React, {Component} from 'react'
import axios from 'axios'
import  {Link} from 'react-router-dom'
import Header from './Header'

import ProductDetail from './ProductDetail'
import { parse } from 'url';
import { type } from 'os';
import { string } from 'prop-types';


class ProductList extends Component{



    state = {
        products : [],
        search_pro : []
    }

    componentDidMount(){
        this.getProduct()
    }

    onButtonSearch = () => {
        const name = this.name_search.value
        const category = this.category_search.value
        const max = parseInt(this.max.value)
        const min = parseInt(this.min.value)

        

        const search = this.state.search_pro.filter(item => {
            if(isNaN(min) && isNaN(max) && category === ''){
                return(
                    item.name_product.toLowerCase().includes(name.toLowerCase())
                )
            }else if(isNaN(min) && isNaN(max) && name === ''){
                return(
                    item.category_name.toLowerCase().includes(category.toLowerCase())
                )
            }else if(isNaN(min) && isNaN(max)){
                return(
                    item.name_product.toLowerCase().includes(name.toLowerCase())
                    &&
                    item.category_name.toLowerCase().includes(category.toLowerCase())
                )
            }else if(isNaN(min) && category === '' && name === '' ){
                return(
                    item.price <= max
                )
            } else if(isNaN(max) && category === '' && name === '' ){
                return(
                    item.price >= min
                )
            } else if(category === '' && name === '' ){
                return(
                    item.price <= max && item.price >= min
                )
            } else if(isNaN(min) && category === ''){
                return(
                    item.name_product.toLowerCase().includes(name.toLowerCase())
                    &&
                    item.price <= max
                )
            } else if(isNaN(max) && category === ''){
                return(
                    item.name_product.toLowerCase().includes(name.toLowerCase())
                    &&
                    item.price >= min
                )
            } else if(isNaN(min) && name === ''){
                return(
                    item.category_name.toLowerCase().includes(category.toLowerCase())
                    &&
                    item.price <= max
                )
            } else if(isNaN(max) && name === ''){
                return(
                    item.category_name.toLowerCase().includes(category.toLowerCase())
                    &&
                    item.price >= min
                )
            } else if(isNaN(min)){
                return(
                    item.category_name.toLowerCase().includes(category.toLowerCase())
                    &&
                    item.price <= max
                    &&
                    item.name_product.toLowerCase().includes(name.toLowerCase())
                )
            } else if(isNaN(max)){
                return(
                    item.category_name.toLowerCase().includes(category.toLowerCase())
                    &&
                    item.price >= min
                    &&
                    item.name_product.toLowerCase().includes(name.toLowerCase())
                )
            } else if(name === ''){
                return(
                    item.category_name.toLowerCase().includes(category.toLowerCase())
                    &&
                    item.price >= min && item.price <= max
                )
            } else if(category === ''){
                return(
                    item.name_product.toLowerCase().includes(name.toLowerCase())
                    &&
                    item.price >= min && item.price <= max
                )
            }  else{
                return(
                    item.name_product.toLowerCase().includes(name.toLowerCase())
                    &&
                    item.price >= min && item.price <= max
                    &&
                    item.category_name.toLowerCase().includes(category.toLowerCase())
                )
            }
        })

        if(search[0]){
            this.setState({products: search})
        }else{
            alert('Product Tidak Tersedia')
        }
    }

    resetFilter = () => {
        return (
            this.setState({products: this.state.search_pro}),
            this.getProduct()
        )
    }

    getProduct = () => {
        axios.get('http://localhost:1993/showproduct')
            .then(res => {
                this.setState({products: res.data, search_pro: res.data})
                console.log(this.state.products);
                
                
            })
    }

     renderList = () => {
        return this.state.products.map(item => {
            
            return(
                
                    <div className = " card col-5 m-3 border border-5 border-dark card">
                        <img className = " card-img-top mt-2" src = {`http://localhost:1993/getproduct/image/${item.product_image}`} width = "200" height = "200"/>
                        <h5 className = "card-title">{item.name_product}</h5>
                        <p className = "card-text">Rp.{item.price.toLocaleString('IN')}</p>
                        <p className = "card-text">Category: {item.category_name}</p>
                        <Link to = {'/productdetail/' + item.id}>
                            <button  className = "btn btn-dark mb-2" >Detail</button>
                        </Link>
                    </div>

                    
            )
        })
    }

    



    render(){
       
            return(
            <div className = "container">
                <div className = "row justify-content-between">
                <div className = "col-3-auto ml-5 mt-3 ">
                    <div>
                        <h3>Filter By:</h3>
                        <label>Name</label>
                        <input className = "form-control" ref = {input => {this.name_search = input}}></input>
                        <label>Category</label>
                        <input className = "form-control" ref = {input => {this.category_search = input}}></input>
                        <label>Price</label>
                        <input className = "form-control" placeholder = "MAX" ref = {input => {this.max = input}}></input>
                        <input className = "form-control" placeholder = "MIN" ref = {input => {this.min = input}}></input>

                        <button className = "mt-2 btn btn-success" onClick = {() => {this.onButtonSearch()}}>Search</button>
                        <button className = "mt-2 ml-3 btn btn-success" onClick = {() => {this.resetFilter()}}>Cancel</button>
                        
                    </div>

                </div>
                <div className = "col-8 mt-3 border border-dark border-8">
                    <div>
                        <h3>Product</h3>
                    </div>
                    <div className = "row col-10-auto">
                        {this.renderList()}
                    </div>
                </div>
            </div>
            </div>
            )
        
        
    }

}

export default ProductList;