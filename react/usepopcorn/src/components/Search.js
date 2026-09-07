import { useEffect, useRef } from "react";

export default function Search({query,setQuery}){
    const inputRef = useRef(null);
    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    useEffect(()=>{
        inputRef.current.focus();
    },[]);

    return <>
        <input ref={inputRef} value={query} onChange={handleChange} className="search" type="text" placeholder="Search movies..."/>
    </>
}