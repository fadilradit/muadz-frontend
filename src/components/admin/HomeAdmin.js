import React,  { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { statement } from '@babel/template';

import HeaderAdmin from './HeaderAdmin'

class HomeAdmin extends Component{

    render(){
        return(
            <div>
                <HeaderAdmin/>
                <div className = "container">
                <div className = "row mt-3">
                    <div className = "col-sm-auto">
                    <div className = "card border border-dark border-5 col-sm-auto" style = {{width:"18rem"}} >
                        <div className = "card-body">
                            <h4 className = "card-title">Product</h4>
                            <h5 className = "card-text">Total:</h5>
                            <a className = "btn btn-dark card-link" href = "/addproduct">Manage Product</a>
                         </div>
                    </div>
                    </div>
                    <div className = "col-sm-auto">
                    <div className = "card  border border-dark border-5 col-sm-auto" style = {{width:"18rem"}} >
                        <div className = "card-body">
                            <h4 className = "card-title">Transaction</h4>
                            <h5 className = "card-text">Total:</h5>
                            <button className = "btn btn-dark">Manage Transaction</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return{
        admin: statement.authAdmin
    }
}

export default connect(mapStateToProps) (HomeAdmin);