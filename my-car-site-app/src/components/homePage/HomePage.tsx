import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { CarFilter } from "../../components/formsMenus/carFilter/index";
import { CarCard } from "../carCard/CarCard";
import { ICarPublication } from "../../types/ICarPublication";

export const HomePage: React.FC = () => {
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

  useEffect(() => {
    fetch("http://vps-dd09afd2.vps.ovh.net:7777/api/classified")
      .then((res) => res.json())
      .then((data: any) => {
        setCars(data.ads);
        setCarsHolder(data.ads);
      });
  }, []);

  const handleCarFilterChange = (carArr: ICarPublication[]) => {
    setCars([...carArr]);
  };

  const handleCarFilterReset = () => {
    setCars([...carsHolder]);
  };

  return (
    <>
      <Header />
      <CarFilter
        cars={cars}
        onFilterChange={handleCarFilterChange}
        onReset={handleCarFilterReset}
      />

      {cars && cars.map((car, key) => <CarCard key={key} carObj={car} />)}
    </>
  );
};
