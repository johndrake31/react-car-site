// react import
import React, { useEffect, useState } from "react";

//Interfaces
import { ICarPublication } from "../../../../types/ICarPublication";
import { ICarSearch } from "../../../../types/ICarSearch";

//Helpers
import {
  filterNewSet,
  isDisabled,
  valueText,
  sortHighLow,
  filterCars,
} from "../../../../shared/helpers";

// 3rd Party
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
} from "@mui/material";

interface IClicked {
  isClickedYr: boolean;
  isClickedKm: boolean;
  isClickedPrice: boolean;
}

/**
 *
 * The dark dispare starts here....
 *
 */
export const CarFilter = () => {
  // STATE
  const [brands, setBrands] = React.useState<string[]>([]);
  const [models, setModels] = React.useState<string[]>([]);
  const [fuelTypes, setFuelTypes] = useState<string[]>([
    "ELECTRIC",
    "GASOLINE",
    "DIESEL",
    "HYBRID",
  ]);
  const [year, setYear] = React.useState([1920, new Date().getFullYear()]);
  const [kilometers, setKilometers] = React.useState([0, 400000]);
  const [price, setPrice] = React.useState([0, 400000]);

  //Search Values and Select Inputs
  const [brand, setBrand] = React.useState<string>("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [isClicked, setIsClicked] = useState<IClicked>({
    isClickedYr: false,
    isClickedKm: false,
    isClickedPrice: false,
  });
  const { isClickedYr, isClickedKm, isClickedPrice } = isClicked;

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

  const [carClassifiedsHolder, setCarClassifiedsHolder] = useState<ICarPublication[]>([
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
        setCarClassifiedsHolder(data.ads)
        handlePageLoad(data.ads);
      });
  }, []);

  //METHODES
  const handlePageLoad = (data: any) => {
    setCarClassifieds(data);
    setBrands(filterNewSet(data, "brand"));
  };

  // function to handle boolean based button clickes and state
  const handleIsClicked = (val: keyof IClicked) => {
    const boolObj = { ...isClicked };
    boolObj[val] ? (boolObj[val] = false) : (boolObj[val] = true);
    setIsClicked(boolObj);
  };

  /**
   * Handle the change of the brand and modify the list of models according to selected brand
   * @param event
   */
  const handleBrandChange = (event: SelectChangeEvent) => {
    const brandName = event.target.value as string;
    setBrand(brandName);
    //return an array filtered by brand
    const tempArr = carClassifieds.filter(
      (it) => it.brand.toLocaleLowerCase() === brandName.toLocaleLowerCase()
    );
    //unique set of fuel types filtered
    setFuelTypes([...new Set(tempArr.map((it) => it.fuel))]);
    setModels(filterNewSet(tempArr, "model"));
  };

  const handleModelChange = (event: SelectChangeEvent) => {
    const modelName = event.target.value as string;
    setModel(modelName);
  };

  const handleFuelTypeChange = (event: SelectChangeEvent) => {
    setFuelType(event.target.value as string);
  };

  const handleYearChange = (event: Event, newValue: number | number[]) => {
    setYear(newValue as number[]);
  };

  const handleKilometersChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setKilometers(newValue as number[]);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };

  const handleSubmit = () => {
   
    const searchObj: ICarSearch = {
      brand: brand,
      model: model,
      fuelType: fuelType,
      years: sortHighLow(year[0], year[1]),
      kilometers: sortHighLow(kilometers[0], kilometers[1]),
      price: sortHighLow(price[0], price[1]),
    };

    setCarClassifieds( filterCars(searchObj, carClassifiedsHolder))
  };

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
                {brandname.toLocaleUpperCase()}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

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
                {modelName.toLocaleUpperCase()}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

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
                {fuelName.toLocaleUpperCase()}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {/* 
      
        SLIDERS

      */}
      <Box sx={{ display: "flex" }}>
        {/* BUTTON YEAR */}
        {!isClickedYr ? (
          <Button
            sx={{ m: 1, backgroundColor: "black" }}
            variant="contained"
            onClick={() => {
              handleIsClicked("isClickedYr");
            }}
          >
            {year[0] > year[1]
              ? `${year[1]} - ${year[0]}`
              : `${year[0]} - ${year[1]}`}{" "}
            YR
          </Button>
        ) : (
          isClickedYr && (
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Slider
                sx={{
                  color: "black",
                  "& .MuiSlider-rail": { color: "blue" },
                }}
                getAriaLabel={() => "year range"}
                defaultValue={new Date().getFullYear()}
                color="primary"
                value={year}
                onChange={handleYearChange}
                valueLabelDisplay="auto"
                getAriaValueText={valueText}
                max={new Date().getFullYear()}
                min={1920}
              />
              <Button
                size="small"
                onClick={() => {
                  handleIsClicked("isClickedYr");
                }}
              >
                x
              </Button>
            </FormControl>
          )
        )}
      </Box>

      {/* Slider KILOMETER */}
      <Box sx={{ display: "flex" }}>
        {/* BUTTON Kilometers */}
        {!isClickedKm ? (
          <Button
            sx={{ m: 1, backgroundColor: "black" }}
            variant="contained"
            onClick={() => {
              handleIsClicked("isClickedKm");
            }}
          >
            {kilometers[0] > kilometers[1]
              ? `${kilometers[1]} - ${kilometers[0]}`
              : `${kilometers[0]} - ${kilometers[1]}`}{" "}
            KM
          </Button>
        ) : (
          isClickedKm && (
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Slider
                sx={{
                  color: "black",
                  "& .MuiSlider-rail": { color: "blue" },
                }}
                getAriaLabel={() => "km range"}
                defaultValue={120000}
                color="primary"
                value={kilometers}
                onChange={handleKilometersChange}
                valueLabelDisplay="auto"
                getAriaValueText={valueText}
                max={400000}
                min={0}
              />
              <Button
                size="small"
                onClick={() => {
                  handleIsClicked("isClickedKm");
                }}
              >
                x
              </Button>
            </FormControl>
          )
        )}
      </Box>
      {/* Slider KILOMETER */}
      <Box sx={{ display: "flex" }}>
        {/* BUTTON Kilometers */}
        {!isClickedPrice ? (
          <Button
            sx={{ m: 1, backgroundColor: "black" }}
            variant="contained"
            onClick={() => {
              handleIsClicked("isClickedPrice");
            }}
          >
            {price[0] > price[1]
              ? `${price[1]} - ${price[0]}`
              : `${price[0]} - ${price[1]}`}{" "}
            €
          </Button>
        ) : (
          isClickedPrice && (
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Slider
                sx={{
                  color: "black",
                  "& .MuiSlider-rail": { color: "blue" },
                }}
                getAriaLabel={() => "price range"}
                defaultValue={12000}
                color="primary"
                value={price}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                getAriaValueText={valueText}
                max={400000}
                min={0}
              />
              <Button
                size="small"
                onClick={() => {
                  handleIsClicked("isClickedPrice");
                }}
              >
                x
              </Button>
            </FormControl>
          )
        )}
      </Box>

      <Button
        className="submit-btn"
        sx={{}}
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </Button>
      <Button
        className="submit-btn"
        sx={{}}
        onClick={() => {
          handlePageLoad(carClassifiedsHolder);
        }}
      >
        reset
      </Button>
    </Box>
  );
};
