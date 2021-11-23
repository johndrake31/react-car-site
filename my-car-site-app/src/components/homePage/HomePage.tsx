import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { CarFilter } from "../../components/formsMenus/carFilter/index";
import { CarCard } from "../carCard/CarCard";
import { ICarPublication } from "../../types/ICarPublication";
import { Grid, Pagination, Stack } from "@mui/material";

export const HomePage = () => {
  const [cars, setCars] = useState<ICarPublication[]>([
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
  const [carsHolder, setCarsHolder] = useState<ICarPublication[]>([
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
  const [page, setPage] = useState(0);

  //   const [arrSlice, setArrSlice] = useState([
  //     [
  //       {
  //         id: 3,
  //         title: "Tesla X-Wing White 2021",
  //         description:
  //           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi vel dignissimos sequi harum laboriosam maxime obcaecati est tempore ad debitis ullam minus similique fugit, enim animi consequuntur exercitationem illo eos.",
  //         year: "2021-09-06T00:00:00+00:00",
  //         kilometers: 123456677,
  //         brand: "Tesla",
  //         model: "X-wing",
  //         fuel: "hybrid",
  //         price: 555,
  //         image: "tesla-M-X-2021-white-16-32-55-6137509b0127f.jpg",
  //         garage: [],
  //         user: [],
  //       },
  //     ],
  //     [
  //       {
  //         id: 3,
  //         title: "Tesla X-Wing White 2021",
  //         description:
  //           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi vel dignissimos sequi harum laboriosam maxime obcaecati est tempore ad debitis ullam minus similique fugit, enim animi consequuntur exercitationem illo eos.",
  //         year: "2021-09-06T00:00:00+00:00",
  //         kilometers: 123456677,
  //         brand: "Tesla",
  //         model: "X-wing",
  //         fuel: "hybrid",
  //         price: 555,
  //         image: "tesla-M-X-2021-white-16-32-55-6137509b0127f.jpg",
  //         garage: [],
  //         user: [],
  //       },
  //     ],
  //   ]);
  const [btns, setBtns] = useState<number[]>([1]);

  useEffect(() => {
    fetch("http://vps-dd09afd2.vps.ovh.net:7777/api/classified")
      .then((res) => res.json())
      .then((data: any) => {
        setCars(data.ads.slice(0, 8));
        setCarsHolder(data.ads);
        setBtns([...handlePageCount(data?.ads)]);
      });
    //   .then(() => {

    // handlePageSlice();
    //   });
  }, []);

  const handleCarFilterChange = (carArr: ICarPublication[]) => {
    setCars([...carArr]);
  };
  const handleCarFilterReset = () => {
    setPage(1);
    setCars([...carsHolder]);
  };

  const handleChange = (
    event?: React.ChangeEvent<unknown>,
    value: number = 1
  ) => {
    setPage(value);
  };

  //   const handlePageSlice = () => {
  //     let tempArr: any = [];
  //     for (let i = 0; i < btns.length; i++) {
  //       const min = 8 * (i - 1);
  //       const max = 8 * i;
  //       tempArr.push([cars.slice(min, max)]);
  //     }
  //     setArrSlice([...tempArr]);
  //   };

  const handlePageCount = (arr: object[]) => {
    const tempArr: number[] = [];
    for (let i = 0; i < Math.ceil(arr.length / 8); i++) {
      tempArr.push(i);
    }
    return tempArr;
  };

  return (
    <>
      <Header />
      <CarFilter
        cars={cars}
        onFilterChange={handleCarFilterChange}
        onReset={handleCarFilterReset}
      />
      <Stack spacing={2}>
        <Pagination
          page={page}
          count={btns.length}
          color="primary"
          onChange={handleChange}
        />
      </Stack>
      <Grid container alignItems="center" spacing={2} sx={{ m: 1 }}>
        {cars &&
          cars.map((car, key) => (
            <Grid key={key} item lg={4} xl={3}>
              <CarCard carObj={car} />
            </Grid>
          ))}
      </Grid>
      <Stack spacing={2}>
        <Pagination
          page={page}
          count={btns.length}
          color="primary"
          onChange={handleChange}
        />
      </Stack>
    </>
  );
};
