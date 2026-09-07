import React, { useState,useEffect } from 'react'
export const useLocalStorageState = (initialData,key) => {

  const [val, setVal] = useState(()=>{
    const sVal = localStorage.getItem(key);
    return sVal?JSON.parse(sVal):initialData;
  });
  useEffect(()=>{
    localStorage.setItem(key, JSON.stringify(val));
  },[val]);
  return [val,setVal];
}
