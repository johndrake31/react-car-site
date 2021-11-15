import { Button } from "@mui/material";
import React from "react";
import './header.css';

export const Header = () =>{
    const logClickHandler= ()=>{
        console.log('bob');  
    }
    return (
        <header className="main-header">    
             <Button sx={{backgroundColor: 'black'}} onClick={()=>logClickHandler()} variant="contained">Log-in</Button>
             <h1 className="mainTitle center">My Car website</h1>
             <h2 className="secondaryTitle center">Find the car of your dreams new or old</h2>
        </header> 
     );
}

export default Header;