import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'


    function Home() {

    const images = [
        'https://images.pexels.com/photos/707915/pexels-photo-707915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/7079774/pexels-photo-7079774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/2377965/pexels-photo-2377965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/463405/pexels-photo-463405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ]


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
    console.log(data)
    if (Object.keys(data).length === 0) {
        console.log("CAUGHT PROMISE *****")
        return (<div>Loading</div>)
    }
    return (
        <>
        <div>
            <h2>Carousel Image</h2>
            <Slider>
                {images.map((image, index) => 
                <div key={index}>
                    <img src={image} alt={`Image ${index}`} />
                </div>
                )}
            </Slider>
        </div>
        <div>
            <h3>{data.text}</h3>
            <h4>-{ data.author.split(',')[0] }</h4>
        </div>
        </>
    );
};

export default Home;
