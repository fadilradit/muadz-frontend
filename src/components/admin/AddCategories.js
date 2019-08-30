import React,  { Component } from 'react'

import {
    Jumbotron
} from 'react-bootstrap'

class AddCategories extends Component{

    state = {
        add: false
    }



render(){
    if(!this.state.add){
        return(
            <Jumbotron>
                <div className = "container">
                    <h1>Categories</h1>
                    <button className = "btn btn-outline-dark" onClick = {() => {this.setState({add: !this.state.add})}}>Add New Categories</button>
                    <table className="table table-hover mb-5 text-center">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>                                    
                                    <th scope="col">CATEGORY</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                            </table>    
                </div>
                
            </Jumbotron>
        )
    }else{
        return(
            <Jumbotron>
            <div className = "container">
                <h1>Add Categories</h1>
                    <div className = "col-sm">
                        <label>Categories</label>
                        <input type = "text" className = "form-control" placeholder = "Type Here"></input>
                        <button className = "btn btn-outline-dark mt-2">Add</button>
                        <button className = "btn btn-outline-dark ml-2 mt-2" onClick = {() => {this.setState({add: !this.state.add})}}>Cancel</button>
                    </div>
            </div>
        </Jumbotron>
        )
    }
}



}

export default AddCategories;