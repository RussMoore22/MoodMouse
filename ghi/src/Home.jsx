import React, { useState, useEffect } from 'react'
import './CarouselComponent.css'
import { Link } from "react-router-dom"

function Home() {
    const [data, setData] = useState({})
    const [currentIndex, setCurrentIndex] = useState(0)
    const images = [
        'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1234035/pexels-photo-1234035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/8438104/pexels-photo-8438104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/12347934/pexels-photo-12347934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ]

    const numGen = () => {
        return Math.floor(Math.random() * 16)
    }
    const fetchData = async () => {
        const response = await fetch('https://type.fit/api/quotes')
        if (response.ok) {
            const responseJson = await response.json()
            setData(responseJson[numGen()])
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const indexInterval = setInterval(() => {
            const updatedIndex = (currentIndex + 1) % images.length
            setCurrentIndex(updatedIndex)
        }, 10000)
        return () => clearInterval(indexInterval)
    }, [currentIndex])

    if (Object.keys(data).length === 0) {
        return <div>Loading</div>
    }

    return (
        <>
            <div
                id="myCarousel"
                className="carousel slide carousel-fade"
                data-ride="carousel"
            >
                <div className="carousel-inner">
                    {images.map((imageUrl, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${
                                index === currentIndex ? 'active' : ''
                            }`}
                            data-interval={
                                index === 0
                                    ? '2000'
                                    : index === 1
                                    ? '1000'
                                    : '500'
                            }
                        >
                            <div
                                className="overlay-image"
                                style={{ backgroundImage: `url(${imageUrl})` }}
                            ></div>
                            <div className="container-1">
                                <div className="quote-content">
                                    <h1 className="quote-text">{data.text}</h1>
                                    <h2 className="quote-author">
                                        -{data.author.split(',')[0]}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Link
                    className="carousel-control-prev"
                    role="button"
                    data-slide="prev"
                >
                    <span className="sr-only">Previous</span>
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                </Link>
                <Link
                    className="carousel-control-next"
                    role="button"
                    data-slide="next"
                >
                    <span className="sr-only">Next</span>
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                </Link>
            </div>
        </>
    )
}
export default Home
