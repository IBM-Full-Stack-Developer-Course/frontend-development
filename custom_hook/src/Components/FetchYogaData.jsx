// eslint-disable-next-line no-unused-vars
import React from 'react'
import useFetch from './UseFetch'
import './FetchData.css'

const FetchYogaData = () => {
    const [data] = useFetch('https://api.npoint.io/4459a9a10e43812e1152')
    console.log(data)

    return (
        <>
            <h1 className="usefetch_heading">Use Fetch Custom Hook v2</h1>
            <ul className="list_data_main">
                {data && data.map((item, index) => (
                    <li className='list_data' key={index}>
                        <h3>{item.name}</h3>
                        <p><strong>Name: </strong>{item.name}</p>
                        <p><strong>Benefits: </strong>{item.benefits}</p>
                        <p><strong>Time duration: </strong>{item.time_duration}</p>
                    </li>
                ))}
            </ul>

        </>
    )

}

export default FetchYogaData
