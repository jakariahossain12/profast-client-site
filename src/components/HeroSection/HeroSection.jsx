import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import banner1 from '../../assets/banner/banner1.png'
import banner2 from '../../assets/banner/banner2.png'
import banner3 from '../../assets/banner/banner3.png'
const HeroSection = () => {
    return (
      <Carousel
        
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
            showArrows={false}
            className=' overflow-hidden rounded-4xl'
      >
        <div>
          <img src={banner1} />
          
        </div>
        <div>
          <img src={banner2} />
         
        </div>
        <div>
          <img src={banner3} />
          
        </div>
      </Carousel>
    );
};

export default HeroSection;