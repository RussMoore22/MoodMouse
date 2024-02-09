import React, { useState, useEffect } from 'react';
import CarouselComponent from './CarouselComponent';
import "./CarouselComponent.css"


function Home() {
    const [data, setData] = useState({})
    const url = 'https://type.fit/api/quotes'
    const numGen = () => {
        return Math.floor(Math.random()*16)
    }
    const fetchData = async () => {
            const response = await fetch(url)
            if (response.ok){
                const responseJson = await response.json()
                setData(responseJson[numGen()])
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    if (Object.keys(data).length === 0) {
        return (<div>Loading</div>)
    }
    return (
        <>
            <div className="quote-container">
                <div className="quote-content">
                    <p className="quote-text">{data.text}</p>
                    <p className="quote-author">-{data.author.split(',')[0]}</p>
                </div>
                <CarouselComponent />
            </div>
        <div>
            <footer> Hello there !!!!!!!!!!!! </footer>
        </div>
        </>
    );
};

export default Home;
