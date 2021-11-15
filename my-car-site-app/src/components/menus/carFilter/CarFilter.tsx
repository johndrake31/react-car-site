import {
    Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

export const CarFilter = () => {
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [fuelType, setFuelType] = React.useState("");

  const handleBrandChange = (event: SelectChangeEvent) => {
    setBrand(event.target.value as string);
    console.log(event.target.value);
  };

  const handleModelChange = (event: SelectChangeEvent) => {
    setModel(event.target.value as string);
    console.log(event.target.value);
  };
  const handleFuelTypeChange = (event: SelectChangeEvent) => {
    setFuelType(event.target.value as string);
    console.log(event.target.value);
  };
  
  return (
<Box sx={{display: 'flex'}}>
    {/* SELECTS */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        {/* Brand */}
        <InputLabel id="brand-simple-select-label">Brand</InputLabel>
        <Select
          labelId="brand-simple-select-label"
          id="brand-simple-select"
          value={brand}
          label="Brand"
          onChange={handleBrandChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    <br />
    <br />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        {/* Model */}
        <InputLabel id="Model-simple-select-label">Model</InputLabel>
        <Select
          labelId="Model-simple-select-label"
          id="model-simple-select"
          value={model}
          label="Model"
          onChange={handleModelChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
<br />
<br />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        {/* Fuel Type */}
        <InputLabel id="fuel-type-select-label">Fuel Type</InputLabel>
        <Select
          labelId="fuel-type-select-label"
          id="fuel-simple-select"
          value={fuelType}
          label="FuelType"
          onChange={handleFuelTypeChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      
      
      {/* SLIDERS */}
    </Box>
  );
};

export default CarFilter;
