import React from 'react'
import { Button, Carousel } from 'react-bootstrap'

import './FeaturedCarousel.scss'

const FeaturedCarousel = () => {
  return (
    <Carousel className="Carousel" interval={100000}>
      <Carousel.Item className="Carousel__Item">
        <img
          className="d-block"
          src="https://via.placeholder.com/300x450"
          alt="Third slide"
        />

        <Carousel.Caption className="Carousel__Caption" draggable="false">
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Button color="primary">Details</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="Carousel__Item">
        <img
          className="d-block"
          src="https://via.placeholder.com/300x450"
          alt="Third slide"
        />

        <Carousel.Caption className="Carousel__Caption" draggable="false">
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
          <Button color="primary">Details</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default FeaturedCarousel
