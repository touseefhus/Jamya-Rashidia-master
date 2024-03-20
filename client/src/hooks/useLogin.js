import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin=()=>{

  const[isLoading,setIsLoading]=useState(null);
  const[error,setError]=useState(null);
  const{dispatch}=useAuthContext();

  const login=async(email,password)=>{

    const response=await fetch(`http://localhost:5000/api/users/login`,{
      method:'POST',
      body:JSON.stringify({email,password}),
      headers:{
       'content-Type':'application/json'
      }
    });

    const json=await response.json();

    if(!response.ok){
      setIsLoading(false);
      setError(json.error);
    }

    if(response.ok){
      localStorage.setItem('user',JSON.stringify(json));

      dispatch({type:'LOGIN',payload:json});

      setIsLoading(false);
    }

  }

  return {login,isLoading,error}

}