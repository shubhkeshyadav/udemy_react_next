import React, { useState } from 'react';



const arr = [
    {
        id:1,
        msg:'11 11 11 22 33 44 55 66',
        read_more_break:7
    },
    {
        id:2,
        msg:'this is text message this is text messagethis is text messagethis is text messagethis is text messagethis is text messagethis is text messagethis is text messagethis is text messagethis is text message this is text messagethis is text messagethis is text messagethis is text messagethis is text messagethis is text messagethis is text messagethis is text message',
        read_more_break:20
    }
];
const TextExpand = () => {
    const [data,setData] = useState(arr);
    const handleReadMore = (id) => {
        const newarr = data.map(a=>a.id === id ? {...a,read_less_break:a.read_more_break,read_more_break:a.msg.length}:a);
        setData(newarr);
    }
    const handleReadLess = (id) => {
        const newarr = data.map(a=>a.id === id ? {...a,read_more_break:a.read_less_break,read_less_break:0}:a);
        setData(newarr);
    }
  return (
    <ul>
        {data.map((ar,i)=>{
            return (<li key={i}>
                {ar.msg.slice(0, ar.read_more_break) }
                {ar.msg.length > ar.read_more_break && 
                    <button onClick={()=>{handleReadMore(ar.id)}}>Read more..</button>
                }
                {ar.read_less_break > 0 && 
                    <button onClick={()=>{handleReadLess(ar.id)}}>Read less..</button>
                }
            </li>)
        })}
    </ul>
  )
}

export default TextExpand