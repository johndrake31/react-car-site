// react import
import React, { useEffect, useState } from "react";

//Interfaces
import { ICarPublication } from "../../../../types/ICarPublication";
import { ICarSearch } from "../../../../types/ICarSearch";

//Helpers
import {filterNewSet, isDisabled} from '../../../../shared/helpers';

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export const CarFilter = () => {
  const [brands, setBrands] = React.useState<string[]>([]);
  const [models, setModels] = React.useState<string[]>([]);
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);

  //Search Values and Select Inputs
  const [brand, setBrand] = React.useState<string>("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState("");


  const [carClassifieds, setCarClassifieds] = useState<ICarPublication[]>([
    {
      id: 3,
      title: "Tesla X-Wing White 2021",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi vel dignissimos sequi harum laboriosam maxime obcaecati est tempore ad debitis ullam minus similique fugit, enim animi consequuntur exercitationem illo eos.",
      year: "2021-09-06T00:00:00+00:00",
      kilometers: 123456677,
      brand: "Tesla",
      model: "X-wing",
      fuel: "hybrid",
      price: 555,
      image: "tesla-M-X-2021-white-16-32-55-6137509b0127f.jpg",
      garage: [],
      user: [],
    },
  ]);
 
  useEffect(() => {
    fetch("http://vps-dd09afd2.vps.ovh.net:7777/api/classified")
      .then((res) => res.json())
      .then((data: any) => {
        //will be passed later to carClassfied Component
        setCarClassifieds(data.ads);
        setBrands(filterNewSet(data.ads, "brand"));
      });
  }, []);

  /**
   * Handle the change of the brand and modify the list of models according to selected brand
   *
   * @param event
   */
  const handleBrandChange = (event: SelectChangeEvent) => {
    const brandName = event.target.value as string;
    setBrand(brandName);
    //return an array filtered by brand
    const tempArr = carClassifieds.filter(
      (it) => it.brand.toLocaleLowerCase() === brandName.toLocaleLowerCase()
    );
    setFuelTypes([...new Set(tempArr.map(it =>it.fuel ))]);
    setModels(filterNewSet(tempArr, "model"));
  };

/**
 * Handle the change of the brand and modify the list of models according to selected brand
 * 
 * @param event
 */
  const handleModelChange = (event: SelectChangeEvent) => {
    const modelName = event.target.value as string;
    setModel(modelName);
    console.log(modelName);
  };

  const handleFuelTypeChange = (event: SelectChangeEvent) => {
    setFuelType(event.target.value as string);
    console.log(event.target.value);
  };

  const handleSubmit = ()=>{
    const searchObj:ICarSearch = {
      brand: brand,
      model: model,
      fuelType: fuelType,
      years: "",
      Kilometers: "",
      price: '',
    }
    console.log(searchObj);
    
  }

  return (
    <Box sx={{ display: "flex" }}>
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
          {brands &&
            brands.map((brandname, key) => (
              <MenuItem key={key} value={brandname}>
                {brandname}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <br />
      <br />

      <FormControl sx={{ m: 1, minWidth: 120 }} {...isDisabled(brand)}>
        {/* Model */}
        <InputLabel id="Model-simple-select-label">Model</InputLabel>
        <Select
          labelId="Model-simple-select-label"
          id="model-simple-select"
          value={model}
          label="Model"
          onChange={handleModelChange}
        >
          {models &&
            models.map((modelName, key) => (
              <MenuItem key={key} value={modelName}>
                {modelName}
              </MenuItem>
            ))}
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
          {fuelTypes &&
            fuelTypes.map((fuelName, key) => (
              <MenuItem key={key} value={fuelName}>
                {fuelName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {/* SLIDERS */}
      <Button onClick={()=>{handleSubmit()}}>Submit</Button>
    </Box>
  );
};
