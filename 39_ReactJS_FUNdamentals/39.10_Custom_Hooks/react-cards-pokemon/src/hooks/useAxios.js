import Axios from "axios";
import uuid from "uuid";
import React, {useState} from "react";

const useAxios = (baseUrl) => {
    const [objArr, setNewObj] = useState([]);
    async function reqNewObj(urlCont) {
        let url
        urlCont ? url = baseUrl + urlCont : url = baseUrl
        const res = await Axios.get(url);
        setNewObj([...objArr, {...res.data, id: uuid()}]);
    };
    return [objArr, reqNewObj]
}

export default useAxios;