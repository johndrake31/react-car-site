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

export function valueText(value:any) {
  return `${value} Yr`;
}

export const sortHighLow = (num1:number, num2:number)=>{
  return num1 > num2 ? [num2, num1] : [num1, num2];;
}