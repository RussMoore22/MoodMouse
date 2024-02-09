import React, { useState, useEffect, onClick} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CarouselComponent.css"


const CarouselComponent = () => {

    const staticImages = [
        'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1234035/pexels-photo-1234035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/8438104/pexels-photo-8438104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/12347934/pexels-photo-12347934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ]

    return (
        <>
            <div className="slider-container">
                <Slider
                    dots={true}
                    infinite={true}
                    speed={300}
                    slidesToShow={1}
                    slidesToScroll={1}
                    prevArrow={
                        <button
                            className="slick-prev"
                        >
                        </button>
                    }
                    nextArrow={
                        <button
                            className="slick-next"
                        >
                        </button>
                    }
                >
                    {staticImages.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={`API image ${index}`} />
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    )
};

export default CarouselComponent;
