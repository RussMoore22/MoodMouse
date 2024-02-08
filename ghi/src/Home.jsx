import React, { useState, useEffect } from 'react';
import CarouselComponent from './CarouselComponent';


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

    console.log(data)

    if (Object.keys(data).length === 0) {
        console.log("CAUGHT PROMISE *****")
        return (<div>Loading</div>)
    }

    return (
        <>
        <div>
            <h3>{data.text}</h3>
            <h4>-{ data.author.split(',')[0] }</h4>
            <CarouselComponent/>

        </div>
        </>
    )
}

export default Home;
