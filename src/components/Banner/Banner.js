import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {
    Pagination,Navigation, EffectFade, EffectCube, EffectCoverflow, EffectFlip, Autoplay
  } from 'swiper/core';

  

  import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"


import fotoSlide1 from '../../Image/cewekcowok.jpg'
import fotoSlide2 from '../../Image/cewek3.jpg'
import fotoSlide3 from '../../Image/cewek2.jpg'
import './Banner.css'
SwiperCore.use([Autoplay, Pagination, EffectFade, Navigation, EffectCube, EffectCoverflow, EffectFlip]);



class Banner extends Component{

    
    render() {
        return(
          <Swiper 
            className = "main"  
            autoplay = {{delay: 4500, disableOnInteraction: false}}
            pagination={{
              "clickable": true
            }}
            speed = {1500}
            loop = {true}
            spaceBetween={30} 
             >
              <SwiperSlide><img className = "banner-image" src={fotoSlide1} alt="First slide"  /> </SwiperSlide>
              <SwiperSlide><img className = "banner-image" src={fotoSlide2} alt="First slide"  /> </SwiperSlide>
              <SwiperSlide><img className = "banner-image" src={fotoSlide3} alt="First slide"  /> </SwiperSlide>
          </Swiper>
//             <div className = 'mt-3 container'> 
            
//               <div className = "col-sm-auto">
//               <Container>
//             <Row>           
//                 <Carousel className = " d-inline w-100" >
//                   <Carousel.Item>
//                     <img className="d-block w-100 col-sm-auto" src={fotoSlide1} alt="First slide" width="100%" height="550" />
//                     <Carousel.Caption>
                      
//                     </Carousel.Caption>
//                   </Carousel.Item>

//                     <Carousel.Item>
//                       <img className="d-block w-100 col-sm-auto" src={fotoSlide2} alt="Third slide" width="100%" height="550"/>

//                       <Carousel.Caption>
                        
//                       </Carousel.Caption>
//                     </Carousel.Item>

//                     <Carousel.Item>
//                       <img className="d-block w-100" src={fotoSlide3} alt="Third slide" width="100%" height="550"/>

//                       <Carousel.Caption>
                        
//                       </Carousel.Caption>
//                     </Carousel.Item>
//           </Carousel>
//         </Row>           
// </Container>
//               </div>
//             </div>
        )
    }
}

export default Banner;