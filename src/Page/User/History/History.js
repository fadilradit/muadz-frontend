import React, {Component} from 'react'
import {Jumbotron} from 'react-bootstrap'
import axios from 'axios'
import {connect} from  'react-redux'
import {Link} from 'react-router-dom'

import Header from '../../../components/Header/Header'

class History extends Component{



    state = {
        history:[]
    }

    componentDidMount(){
        this.getHistory()
    }

    getHistory = () => {
        const customer_id = this.props.user.id

        axios.get('http://localhost:1993/history/' + customer_id)
        .then(res => {
            this.setState({history: res.data})
            console.log(this.state.history);
            
        })
    }

    renderHistory = () => {
        return this.state.history.map(item => {
            return(
                <tr>
                    <td>{item.name_product}</td>
                    <td>Rp.{item.price.toLocaleString('IN')}</td>
                    <td>{item.qty}</td>
                    <td>Rp.{item.total_harga.toLocaleString('IN')}</td>
                    <td>{item.order_status}</td>
                    </tr>
            )
        })
    }



    render(){
        if(this.state.history.length > 0){
            return(
                <div>
                    <Header/>
                            <Jumbotron className = "">
                                    <div className = "container">
                                        <h1>History</h1>
                                        <table className = "table table-hover mb-5 text-center">
                                            <thead>
                                                <tr>
                                                    <th>Nama Product</th>
                                                    <th>Harga</th>
                                                    <th>QTY</th>
                                                    <th>Total Harga</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               {this.renderHistory()}
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
                    <h2>Anda Belum Melakukan Transaksi Apapun</h2>
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


export default connect(mapStateToProps)(History);