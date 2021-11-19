import React, { useEffect, useState } from "react";
import { ICarPublication } from "../../types/ICarPublication";

export const CarCard = (props: any) => {
  const { carObj } = props;
  const [car, setCar] = useState<ICarPublication>();

  useEffect(() => {
    setCar(carObj);
  }, [carObj]);

  return <h1>{car?.title}</h1>;
};
