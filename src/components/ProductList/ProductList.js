import React, {Component} from 'react'
import axios from 'axios'
import  {Link} from 'react-router-dom'
import Header from '../Header/Header'
import {Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'

import ProductDetail from '../../Page/User/ProductDetail/ProductDetail'
import SadIcon from '../../Asset/Sad Icon/sad_icon.png'
import './ProductList.css'


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
            Swal.fire({
                title: 'Sorry',
                text: 'Produk Yang Anda Cari Belum Tersedia',
                imageUrl: SadIcon,
                imageHeight:100,
                imageWidth:100
                
              })
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
                <Link to = {'/productdetail/' + item.id} className = "text-link" >
                    <div className = "card" to = {'/productdetail/' + item.id} >
                    <div  className = "card-content" >
                    <img src = {`http://localhost:1993/getproduct/image/${item.product_image}`} />
                    </div>
                    <label className = "title" >{item.name_product}</label>
                    <p className = "price" >Rp.{item.price.toLocaleString('IN')}</p>
                    <p className = "category" >Category: {item.category_name}</p>
                </div>
                </Link>
                
                
                    // <div className = " card col-5 m-3 border border-5 border-dark card">
                    //     <img className = " card-img-top mt-2" src = {`http://localhost:1993/getproduct/image/${item.product_image}`} width = "200" height = "200"/>
                    //     <h5 className = "card-title">{item.name_product}</h5>
                    //     <p className = "card-text">Rp.{item.price.toLocaleString('IN')}</p>
                    //     <p className = "card-text">Category: {item.category_name}</p>
                    //     <Link to = {'/productdetail/' + item.id}>
                    //         <button  className = "btn btn-dark mb-2" >Detail</button>
                    //     </Link>
                    // </div>

                    
            )
        })
    }

    searchToggle = () => {
        const search = document.querySelector('h3')
        const input = document.querySelector('div.input-filter')
        const buttonGroup = document.querySelector('div.filter-button')
        

        search.classList.toggle('slide')
        input.classList.toggle('slide')
        buttonGroup.classList.toggle('slide')
    
        // nav.classList.toggle('slide')
        
    
    }

    



    render(){
       
            return(
                <div className = "productlist-body" >

                    <div className = "filter-product" >

                        <div className = 'menu-toogle' onClick = {this.searchToggle} >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <h3 className = "search-head" >Search By :</h3>

                        <div className = "input-filter" >
                            
                            <input placeholder = "Product Name" ref = {input => {this.name_search = input}} />
                            <input placeholder = "Category" ref = {input => {this.category_search = input}} />
                            <input placeholder = "MAX Price" ref = {input => {this.max = input}} />
                            <input placeholder = "MIN Price"ref = {input => {this.min = input}} />
                        </div>

                        <div className = 'filter-button' >
                            <button onClick = {() => {this.onButtonSearch()}} >Search</button>
                            <button onClick = {() => {this.resetFilter()}} >Reset</button>
                        </div>

                    </div>

                    

                    <div className = "product-list" >
                        {this.renderList()}
                    </div>

                </div>
            // <div className = "container">
            //     <div className = "row justify-content-between">
            //     <div className = "col-3-auto ml-5 mt-3 ">
            //         <div>
            //             <h3>Filter By:</h3>
            //             <label>Name</label>
            //             <input className = "form-control" ref = {input => {this.name_search = input}}></input>
            //             <label>Category</label>
            //             <input className = "form-control" ref = {input => {this.category_search = input}}></input>
            //             <label>Price</label>
            //             <input className = "form-control" placeholder = "MAX" ref = {input => {this.max = input}}></input>
            //             <input className = "form-control" placeholder = "MIN" ref = {input => {this.min = input}}></input>

            //             <button className = "mt-2 btn btn-success" onClick = {() => {this.onButtonSearch()}}>Search</button>
            //             <button className = "mt-2 ml-3 btn btn-success" onClick = {() => {this.resetFilter()}}>Cancel</button>
                        
            //         </div>

            //     </div>
            //     <div className = "col-8 mt-3">
            //         <div>
            //             <h3>Product:</h3>
            //         </div>
            //         <div className = "row col-10-auto">
            //             {this.renderList()}
            //         </div>
            //     </div>
            // </div>
            // </div>
            )
        
        
    }

}

export default ProductList;