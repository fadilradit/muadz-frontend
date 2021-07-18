import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'

import fotoSlide1 from '../../Image/cewekcowok.jpg'
import fotoSlide2 from '../../Image/cewek3.jpg'
import fotoSlide3 from '../../Image/cowok2.jpg'
import './Banner.css'

class Banner extends Component{
    render() {
        return(
          <main>
              <img className = "banner-image" src={fotoSlide1} alt="First slide"  /> 
          </main>
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