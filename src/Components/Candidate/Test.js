
import {useEffect, useState} from 'react'
import axios from 'axios'
import {BASE_URL} from '../../config';

const Test = () =>{
    const [arr,setArr] = useState([]);
    const [arr2,setArr2] = useState([]);
    const [page,setPage] = useState(1);

    useEffect(()=>{ 
        const config = {
            headers: { Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoYXJhZEBnbWFpbC5jb20iLCJuYW1lIjoic2hhcmFkIiwic2tpbGxzIjoiSFRNTCwgQ1NTLCBKUyIsInVzZXJSb2xlIjoxLCJjcmVhdGVkQXQiOiIyMDIwLTA2LTA5VDE3OjI2OjUwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA0LTEzVDA1OjQxOjMxLjAwMFoiLCJpZCI6IjcxOTJiODEzLWMwMDItNGIzNC05NGQ2LWE5MmVkMWUzOGY1NyIsImlhdCI6MTYxODMxMzA3NH0.z8ZyxJ_Q2pDywZVULhxtVNVcTeweX65oAMvoA2Qdog0" }
        };
        axios.get(`${BASE_URL}/candidates/jobs?page=${page}`,config)
        .then((res)=>{
            setArr(a=>[...a,...res.data.data])
        })
        .catch((err)=>{
            console.log(err); 
        });
    },[page]);

    useEffect(()=>{ 
        setArr2(arr.slice(0,10));
        console.log("test")
    },[arr]);


    return (
        <div style={{textAlign:"center"}}>
            <div>{arr.length}</div>
            <div>Page : {page}</div>
            <div>{arr2.length}</div>
            <button onClick={()=>{setPage(page+1)}}>Increase</button>
            <button onClick={()=>{
                let tempArr = arr;
                tempArr.splice(0,1);
                console.log(tempArr);
                setArr(tempArr);
            }}>Delete</button>
        </div>
    )
}

export default  Test