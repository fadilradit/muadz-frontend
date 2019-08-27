import React, {Component} from 'react'
import {
    Jumbotron,
    Button,
    Container,
    Row,
    Col,
    Image
} from 'react-bootstrap'

import koko1 from '../Image/koko.jpg'
import koko2 from '../Image/koko2.jpg'







class ProductDetail extends Component{

  
    



    render(){
        return(
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="koko1" class="d-block w-100" />
    </div>
    <div class="carousel-item">
      <img src="koko2" class="d-block w-100" />
    </div>
    >
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

        )
    }
}

export default ProductDetail;