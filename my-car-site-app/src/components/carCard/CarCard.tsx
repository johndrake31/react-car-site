import React, { useEffect, useState } from "react";
import { ICarPublication } from "../../types/ICarPublication";


export const CarCard = (props:ICarPublication)=>{
    const [cars, setCars] = useState<ICarPublication[]>()

    useEffect(()=>{
        console.log(props);
        
    },[])
    return(
        <h1>car cards here</h1>
    )
}