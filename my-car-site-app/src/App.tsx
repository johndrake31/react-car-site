import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import {CarFilter} from "./components/menus/carFilter/index";

function App() {
  return (
    <>
      <Header />
      <CarFilter />
      <div className="car-ads-display">
        <h2>put car ads here</h2>
      </div>
    </>
  );
}

export default App;
