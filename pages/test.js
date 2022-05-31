import React, {useEffect, useState} from "react";
import axios from "axios";

export default function test() {
    const [data, setdata] = useState([])
    const [dataid, setdataid] = useState([])
    async function getid() {
        const res = await axios.get("https://jsonplaceholder.typicode.com/todos")
        setdata(res.data)
    }
    async function changeid(id) {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        console.log(res);
        setdataid(res);
    }
    return (
        <div className="pt-40 min-h-screen h-full w-full">
            <button onClick={getid}>
                get
            </button>
            {data.map((data) => (
                <div className="flex" key={data.id}>
                    <span>
                        {data.title}
                    </span>
                    <button className="bg-red-100 py-1 px-4" onClick={() => changeid(data.id)}>
                        click me
                    </button>
                </div>
            ))}
        </div>
    )
}
