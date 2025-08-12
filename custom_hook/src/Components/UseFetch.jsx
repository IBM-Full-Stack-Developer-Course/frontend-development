// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(url).then((res) => res.json())
            .then((data) => setData(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [data]

}

export default useFetch
