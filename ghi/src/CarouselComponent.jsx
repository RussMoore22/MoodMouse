import React from "react";
import Slider from "react-slick";


const CarouselComponent = () => {
    // sample list of images here:
    const staticImages = [
        "https://unsplash.com/photos/a-view-of-a-mountain-with-a-road-going-through-it-x2PtscrvApE",
        "https://unsplash.com/photos/a-person-standing-in-the-middle-of-a-forest-rS9qpmU0MVw",
        "https://unsplash.com/photos/a-very-tall-building-with-lots-of-windows-0iqeUARmY8g"
    ];

    return (
        <>
        <div>
            <h2>
                Test Carousel... I hope this works!
            </h2>
            <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                prevArrow={<button>Previous Image</button>}
                nextArrow={<button>Next Image</button>}
                >
                {
                    staticImages.map((image,index) => (
                        <div key={index}>
                            <img src={image} alt={`Image ${index}`} />
                        </div>
                    ))
                }
            </Slider>
        </div>

        </>
    );

};



export default CarouselComponent;
