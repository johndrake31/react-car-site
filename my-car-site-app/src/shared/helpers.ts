export const filterNewSet = (arr: any[], key: string) => {
    const tempTable = arr.map((it: any) => it[key]);
    const something: any = [...new Set(tempTable.map((it) => it.toLowerCase()))];
    return something;
  };

export const isDisabled = (val: string) => {
  if (val === "") {
    return { disabled: true };
  }
  return {};
};