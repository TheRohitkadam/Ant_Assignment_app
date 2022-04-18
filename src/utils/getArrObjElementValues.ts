
  const getArrObjElementValues = (data: any, key: string, hasArr?: boolean) => {
    const arr = data.map((item: any) => item[key]);
    if (hasArr) {
      const value = Array.from(new Set(arr.values()));
      const commonArr: any = [...value];
      const arrdata = new Set([].concat(...commonArr));
      return Array.from(arrdata);
    } else {
      const value = new Set(arr.values());
      return Array.from(value);
    }
  };

  export default getArrObjElementValues