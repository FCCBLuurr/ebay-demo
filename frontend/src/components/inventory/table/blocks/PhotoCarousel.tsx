import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface PhotoCarouselProps {
  photos: string[];
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ photos }) => {
  console.log('Photos Array: ', photos)
  return (
    <Carousel showThumbs={true} infiniteLoop useKeyboardArrows width={'100%'}>
      {photos.map((photo, index) => (
        <div key={index}>
          <img 
            src={photo} 
            alt={`Carousel Img ${index + 1}`} 
            style={{ maxHeight: '400px', maxWidth: '100%', objectFit: 'contain' }}
            onError={(event) => {
              console.error('Error loading image:', event);
            }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default React.memo(PhotoCarousel);
