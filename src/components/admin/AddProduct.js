import React,  { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import HeaderAdmin from './HeaderAdmin'
import {
    Jumbotron
} from 'react-bootstrap'

class AddProduct extends Component{

    state = {
        add: false,
        categories : [],
        products: [],
        edit: 0
    }


componentDidMount(){
    this.getCategories()
    this.getProduct()
}

uploadImage = (id) => {
    const formData = new FormData()
    const product_image = this.product_image.files[0]

    formData.append('product_image', product_image)
    formData.append('id', id)

    axios.post('http://localhost:1993/product/image', formData
    ).then(res => {
        this.getProduct()
        this.setState({edit: !this.state.edit})
    })
}


getCategories = () =>{
    axios.get('http://localhost:1993/showcategory')
        .then(res => {
            this.setState({categories: res.data})
            console.log(this.state.categories);
            
            
        })
}

renderCategories = () => {
    return this.state.categories.map(catMap => {
        return (<option value = {catMap.id}>{catMap.category_name}</option>)
    })
}

addProduct = () => {
    const name_product = this.name_product.value
    const price = this.price.value
    const description = this.description.value
    const category_id = this.category_id.value

    if(name_product === '' || price === '' || description === '' || category_id === ''){
        alert('Harap Lengkapi Data Product Yang Akan Di Tambahkan')
    }

    axios.post('http://localhost:1993/addproduct', 
    {
        name_product,
        price,
        description,
        category_id
    }).then(res => {
        if(res.data == 'Product sudah tersedia'){
            alert(res.data)
            
        }
        alert("Berhasil Menambahkan Product")
        this.setState({add: !this.state.add})
        this.getProduct()
    })
}


getProduct = () => {
    axios.get('http://localhost:1993/showproduct')
        .then(res => {
            this.setState({products: res.data})
            console.log(res.data);
            
        })
}


renderProduct = () => {
    return this.state.products.map(productMap => {
        if(this.state.edit !== productMap.id){
            return (
                <tr>
                    <td>{productMap.id}</td>
                    <td>{productMap.name_product}</td>
                    <td>{productMap.description}</td>
                    <td>Rp.{productMap.price.toLocaleString('IN')}</td>
                    <td>{productMap.category_name}</td>
                    <td>
                        <img src = {`http://localhost:1993/getproduct/image/${productMap.product_image}`} className = "" width="200" height="200" />
                    </td>
                    <td>
                        <button className="btn btn-primary" onClick = {() => {this.setState({edit: productMap.id})}}>Edit</button>
                        <button className="btn btn-primary ml-2" onClick = {() => {this.deleteProduct(productMap.id)}}>Delete</button>
                    </td>
                </tr>
            )
        }
        return(
            <tr>
                    <td>{productMap.id}</td>
                    <td><input type = "text" className = "form-control" defaultValue = {productMap.name_product} ref = {input => {this.editNameProduct = input}} /></td>
                    <td><input type = "text" className = "form-control" defaultValue = {productMap.description} ref = {input => {this.editDescription = input}} /></td>
                    <td><input type = "text" className = "form-control" defaultValue = {productMap.price} ref = {input => {this.editPrice = input}} /></td>
                    <td><select className = "form-control" value = {productMap.category_id} ref = {input => {this.editCategory_Id = input}} >
                            {this.renderCategories()}
                        </select></td>
                    <td>
                        <input type = "file" ref = {input => (this.product_image = input)}></input>
                    </td>
                    <td>
                        <button className="btn btn-primary" onClick = {() => {this.saveEdit(productMap.id)}}>Save</button>
                        <button className="btn btn-primary  ml-2" onClick = {() => {this.setState({edit: 0})}}>Cancel</button>
                        <button className="btn btn-primary mt-2 " onClick = {() => {this.uploadImage(productMap.id)}}>Upload Image</button>
                    </td>
                </tr>
        )
    })
}

renderEdit = () => {
    return this.state.products.map(productMap => {
        
    })

}


saveEdit = (productMap) => {
    const name_product = this.editNameProduct.value
    const price = this.editPrice.value
    const description = this.editDescription.value
    const category_id = this.editCategory_Id.value

    axios.patch('http://localhost:1993/updateproduct/' + productMap,
    {
        name_product,
        price,
        description,
        category_id
    }).then(res => {
        console.log('data berhasil di ubah');
        console.log(res);
        this.setState({edit: 0})
        this.getProduct()
        
        
    })
}


deleteProduct = (productMap) => {
    axios.delete('http://localhost:1993/deleteproduct/' + productMap)
        .then(res => {
            alert("Data Berhasil Dihapus")
            console.log(res);
            this.getProduct()
        })
}

    render(){
        if( this.props.admin){
            if(this.state.add){
                return(
    
                   <div>
                       <HeaderAdmin/>
                        <Jumbotron className = "">
                        <div className = "container">
                            <h1>Add Product</h1>
                            <div className = "row">
                                <div className = "col-sm">
                                    <label className = "">Product Name</label>
                                    <input type = "text" className = "form-control" ref = {input => this.name_product = input} ></input>
                                    <label className = "" >Price</label>
                                    <input type = "text" className = "form-control" ref = {input => this.price =input}></input>
                                    <label>Category</label>
                                    <select className = "form-control" ref = {input => this.category_id = input} >
                                        {this.renderCategories()}
                                    </select>
                                    <label>Description</label>
                                    <textarea  className = "form-control" ref = {input => this.description = input} ></textarea>
                                    <button className = "btn btn-outline-dark mt-3" onClick = {this.addProduct} >Add</button>
                                    <button className = "btn btn-outline-dark mt-3 ml-2" onClick = {() => {this.setState({add: !this.state.add})}}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Jumbotron>
                   </div>
        
                )
            }else{
                return(
                    <div>
                        <HeaderAdmin/>
                        <Jumbotron>
                        <div className = "container">
                            <h1>Product</h1>
                                <button className = "btn btn-outline-dark" onClick = {() => {this.setState({add: !this.state.add})}}>Add New Product</button>
                                <table className="table table-hover mb-5 text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">NAME</th>
                                        <th scope="col">DESC</th>
                                        <th scope="col">PRICE</th>                                    
                                        <th scope="col">CATEGORY</th>                                    
                                        <th scope="col">PICTURE</th>
                                        <th scope="col">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderProduct()}
                                </tbody>
                                </table>
                        </div>
                    </Jumbotron>
                    </div>
                )
            }
        }
    }



}

const mapStateToProps = state => {
    return{
        admin: state.authAdmin
    }
}

export default connect(mapStateToProps) (AddProduct);