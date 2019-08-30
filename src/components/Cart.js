import React, {Component} from 'react'
import {Jumbotron} from 'react-bootstrap'

import Header from './Header'


class Cart extends Component{


    render(){
        return(
            <div>
                <Header/>
                <Jumbotron className = "bg-dark">
                    <div className = "container text-light">
                        <h1>Cart</h1>
                        <table className = "table table-hover mb-5 text-center text-light">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                </Jumbotron>

            </div>
        )
    }

}


export default Cart;