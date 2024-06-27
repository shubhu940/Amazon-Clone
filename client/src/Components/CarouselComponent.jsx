import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 

const CarouselComponent = () => {
  return (
    <Carousel 
    autoPlay
    infiniteLoop
    showThumbs={false}
    showStatus={false}
    interval={3000}
    transitionTime={500}
    swipeable
    emulateTouch
    useKeyboardArrows
    >
      <div>
        <img src="/ImagesUse/wheatfield.jpg" alt="Slide 1" />
      
      </div>
      <div>
        <img src="/ImagesUse/cornfield.jpg" alt="Slide 2" />
      
      </div>
      <div>
        <img src="/ImagesUse/jawarfield.jpeg" alt="Slide 3" />
       
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
