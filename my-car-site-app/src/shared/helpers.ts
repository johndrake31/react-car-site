import { ICarPublication } from "../types/ICarPublication";
import { ICarSearch } from "../types/ICarSearch";


export const filterNewSet = (arr: any[], key: string) => {
  const tempTable = arr.map((it: any) => it[key]);
  const something: any = [...new Set(tempTable.map((it) => it.toLowerCase()))];
  return something;
};

//Test to see if something is true and passes a disabled project.
export const isDisabled = (val: string) => {
  if (val === "") {
    return { disabled: true };
  }
  return {};
};

export function valueText(value: any) {
  return `${value} Yr`;
}

/**
 * 
 * filters a table of 2 numbers and returns lowest number in first index
 * @param num1 
 * @param num2 
 * @returns 
 */
export const sortHighLow = (num1: number, num2: number) => {
  return num1 > num2 ? [num2, num1] : [num1, num2];;
}

/**
 * using a search object the function returns a filtered table.
 * @param searchObj 
 * @param carArr 
 * @returns filterTable
 */
export const filterCars = (searchObj: ICarSearch, carArr: ICarPublication[]) => {
  let filterTable = [...carArr];

  let {
    brand,
    model,
    fuelType,
    years,
    kilometers,
    price
  } = searchObj

  // if brand is set do the first filter
  if (brand) {
    filterTable = filterTable.filter((carAd: ICarPublication) => carAd.brand.toLowerCase() === brand.toLowerCase()
    );
  }
  // if model is set do the 2nd filter by model

  if (model) {
    filterTable = filterTable.filter((carAd: ICarPublication) =>
      carAd.model.toLowerCase() === model.toLowerCase()
    );
  }

  // if fuelType is set do the 3rd filter toLowerCase

  if (fuelType) {
    filterTable = filterTable.filter((carAd: ICarPublication) => carAd.fuel.toLowerCase() === fuelType.toLowerCase())
  }

  // if year is set do the 4th filter

  if (years) {
    filterTable = filterTable.filter((carAd: ICarPublication) =>
      +carAd.year.slice(0, 4) >= years[0] && +carAd.year.slice(0, 4) <= years[1]
    );
  }

  // if kilometers is set do the 5th filter

  if (kilometers) {
    filterTable = filterTable.filter((carAd: ICarPublication) =>
      carAd.kilometers >= kilometers[0] && carAd.kilometers <= kilometers[1]
    );
  }

  // if price is set do the 5th filter

  if (price) {
    filterTable = filterTable.filter((carAd: ICarPublication) =>
      carAd.price >= price[0] && carAd.price <= price[1]
    );
  }

  return filterTable;
}
