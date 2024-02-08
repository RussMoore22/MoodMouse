import React, { useState, useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const CarouselComponent = () => {
    // sample list of images here:
    // const staticImages = [
    //     "https://unsplash.com/photos/a-view-of-a-mountain-with-a-road-going-through-it-x2PtscrvApE",
    //     "https://unsplash.com/photos/a-person-standing-in-the-middle-of-a-forest-rS9qpmU0MVw",
    //     "https://unsplash.com/photos/a-very-tall-building-with-lots-of-windows-0iqeUARmY8g"
    // ];

    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.artic.edu/api/v1/artworks/search?params=%7B%22q%22%3A%22cats%22%2C%22query%22%3A%7B%22term%22%3A%7B%22is_public_domain%22%3Atrue%7D%7D%7D");
                const data = await response.json();
                // Extract image URLs from the response and update state
                const urls = data?.data?.map(item => item?.thumbnail?.url || 'defaultImageUrlHere') || [];
                setImageUrls(urls || []);
            } catch (error) {
                console.error("Error fetching image data:", error);
            }
        };

        fetchData();
    }, []);



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
                    imageUrls.map((imageUrl,index) => (
                        <div key={index}>
                            {console.log(imageUrl)}
                            <img src={imageUrl} alt={`API image ${index}`} />
                        </div>
                    ))
                }
            </Slider>
        </div>

        </>
    );

};



export default CarouselComponent;
